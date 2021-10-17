import { getAllFlows, getAllFlowItems, getAllFlowItemsWithTools, getAllActions } from '../utils/supabase-client';
import { useUser } from '../utils/useUser';
import LightHeroD from '../components/ui/Hero';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import ListItemMirrored from '../components/ui/ListItemMirrored';
import SquareBlock from '../components/ui/SquareBlock';
import PrettyBlock from '../components/ui/PrettyBlock';
import Link from 'next/link';
import Button from '../components/ui/Button';

export default function Index({ flows, flowItemsWithTools, actions }) {

  const { user } = useUser();
  const flowArray = flows.map(flow => {
  const currentFlowItems = flowItemsWithTools.filter(flowItem => flowItem.flow == flow.id);
  const allToolTitles = [...new Set(currentFlowItems.map(item => item.job_tool.tool.tool))];
  const allToolImages = [...new Set(currentFlowItems.map(item => item.job_tool.tool.logo_url))];

      return (
        <PrettyBlock key={flow.id} smallImage={allToolImages[0] ? allToolImages[0] : null}
      blockLink={'/flow/' + flow.id} blockBody={flow.flow}
      blockDescription={'Using ' + allToolTitles.toString().split(',').join(', ')} />
      )
    } );

    const actionItems = actions.map(action => (
      <div key={action.id} className="w-48">
      <Link href={'/action/' + action.id}>
      <div className="w-full text-center font-semibold border border-black hover:shadow transition cursor-pointer rounded py-3 px-1 mb-2">
      <span>{action.action}</span>
      </div>
      </Link>
      </div>))

    // Work-themed collection of images imagesrc="https://source.unsplash.com/collection/3106209/700x600"

  return (
  	<>
    <LightHeroD heading="Step-by-step guides for work" 
    subheading="Find useful guides and share your knowledge. Grow your garden."
      />
      <div className="flex flex-col lg:flex-row">
      <div className="w-full flex flex-col">
      <h2 className="text-center md:text-left md:pl-8 text-2xl font-semibold py-4 mt-6 px-5">Recent flows</h2>
    <div className="flex flex-wrap px-5 justify-center md:justify-start mb-24">
    {flowArray}
    </div>
    </div>
    {user ? (
      <div className="w-64 mb-24 lg:mt-2 flex flex-col mx-auto items-center pr-4">
    <h2 className="text-center text-xl font-semibold py-4 mt-6 w-full">Actions</h2>
    {actionItems}
    </div>
    ) : (null)}
    </div>
    </>
    )
}

export async function getStaticProps() {
  const flows = await getAllFlows();
  const flowItemsWithTools = await getAllFlowItemsWithTools();
  const actions = await getAllActions();

  return {
    props: {
      actions,
      flows,
      flowItemsWithTools
    },
    revalidate: 60
  };
}
