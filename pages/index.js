import { getAllFlows, getAllFlowItems, getAllFlowItemsWithTools, getAllActions, getAllSections } from '../utils/supabase-client';
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

export default function Index({ flows, flowItemsWithTools, actions, sections }) {

  const { user } = useUser();
  const uniqueSections = [...new Set(sections.map(item => item ? item.section : null))]
  console.log(uniqueSections)
  const sectionArray = uniqueSections.map(section => {
    if(section){
    return (
      <div key={section} className="w-48 mx-4">
      <Link href={'/section/' + section}>
      <div className="w-full text-center font-semibold border border-black hover:shadow transition cursor-pointer rounded py-3 px-1 mb-2">
      <span>{section}</span>
      </div>
      </Link>
      </div>
      )
  }
  })
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
      <Link href={(action.isInternal) ? (action.appsrc) : ('/action/' + action.id)}>
      <div className="w-full text-center font-semibold border border-black hover:shadow transition cursor-pointer rounded py-3 px-1 mb-2">
      <span>{action.action}</span>
      </div>
      </Link>
      </div>))

    // Work-themed collection of images imagesrc="https://source.unsplash.com/collection/3106209/700x600"

  return (
  	<>
    <div className="mt-12"></div>
    <LightHeroD heading="Open-source tools and guides" 
    subheading="Find open-source, fair-code tools and share knowledge"
      />
    <div className="h-48 absolute top-0 w-full z-0" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%237dc99f' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E")`}}>
    <div className="bg-gradient-to-b from-transparent to-white z-0 absolute top-0 w-full h-full">
    </div>    
    </div>
    <div className="flex flex-col">
    {user ? (
      <>
      <h2 className="text-center md:text-left md:pl-8 text-2xl font-semibold py-4 mt-6 px-5">Actions</h2>
    
      <div className="my-8 lg:mt-2 flex flex-wrap content-center mx-auto md:mx-0 justify-between w-2/3 px-5 md:pl-8">
    {actionItems}
    </div>
    </>
    ) : (null)}
    <div className="w-full flex flex-col">
    <div>
    <h2 className="text-center md:text-left md:pl-8 text-2xl font-semibold py-4 px-5">Tools by section</h2>
    <div className="flex flex-wrap my-8 md:w-5/6 justify-center md:justify-start md:pl-4 mb-6">
    {sectionArray}
    </div>
    </div>
    </div>
    <div className="w-full flex flex-col">
    <h2 className="text-center md:text-left md:pl-8 text-2xl font-semibold py-4 px-5">Recent guides</h2>
    <div className="flex flex-wrap px-5 w-full justify-start mb-24">
    {flowArray}
    </div>
    </div>
    </div>
    </>
    )
}

export async function getStaticProps() {
  const flows = await getAllFlows();
  const flowItemsWithTools = await getAllFlowItemsWithTools();
  const actions = await getAllActions();
  const sections = await getAllSections();

  return {
    props: {
      actions,
      flows,
      flowItemsWithTools,
      sections
    },
    revalidate: 60
  };
}
