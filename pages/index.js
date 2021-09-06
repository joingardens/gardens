import Pricing from '../components/Pricing';
import LightHeroD from '../components/ui/Hero';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import ListItemMirrored from '../components/ui/ListItemMirrored';
import { getActiveProductsWithPrices, getAllFlows, getAllFlowItems, getAllFlowItemsWithTools } from '../utils/supabase-client';
import SquareBlock from '../components/ui/SquareBlock';
import PrettyBlock from '../components/ui/PrettyBlock';
import Link from 'next/link';
import Button from '../components/ui/Button';

export default function Index({ products, flows, flowItemsWithTools }) {

    const flowArray = flows.map(flow => {
      const currentFlowItems = flowItemsWithTools.filter(flowItem => flowItem.flow == flow.id);
      const allToolTitles = [...new Set(currentFlowItems.map(item => item.job_tool.tool.tool))];

      return (
        <PrettyBlock key={flow.id} 
      blockLink={'/flow/' + flow.id} blockBody={flow.flow}
      blockDescription={'Using ' + allToolTitles.toString().split(',').join(', ')} />
      )
    } );

    // Work-themed collection of images imagesrc="https://source.unsplash.com/collection/3106209/700x600"

  return (
  	<>
    <LightHeroD heading="Best way to do anything" 
    subheading="See how others solve important problems and submit your own flows. If it can be done - there's a flow for it."
      />
      <h2 className="text-center text-2xl font-semibold py-4 mt-6">Recent flows</h2>
    <div className="flex px-5 justify-center mb-24">
    {flowArray}
    </div>
  	{/*<ParagraphWithButton />
  	<Pricing products={products} />*/}
    </>
    )
}

export async function getStaticProps() {
  const products = await getActiveProductsWithPrices();
  const flows = await getAllFlows();
  const flowItemsWithTools = await getAllFlowItemsWithTools();

  return {
    props: {
      products,
      flows,
      flowItemsWithTools
    },
    revalidate: 60
  };
}
