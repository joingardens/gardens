import { useRouter } from 'next/router'
import Pricing from '../../components/Pricing';
import LightHeroD from '../../components/ui/Hero';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import ListItem from '../../components/ui/ListItem';
import TextList from '../../components/ui/TextList';
import ListItemMirrored from '../../components/ui/ListItemMirrored';
import Title from '../../components/ui/Title';
import { getActiveProductsWithPrices, getFlowItemsByFlowId, 
  getAllOutputs, getOutputById, getAllJobGroups, getFlowOutputsByOutputId, getFlowById, getAllFlows } from '../../utils/supabase-client';
//import MyDisclosure from '@/components/dynamic/disclosure';
//import SquareBlock from '../../components/ui/SquareBlock';
import PrettyBlock from '../../components/ui/PrettyBlock';
import getRandomGradient from '../../utils/getRandomGradient';

export default function Output({ products, jobGroups, 
  output, flowsOutputs, allFlows }) {

  const router = useRouter()
   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>)
  } else {
  const { output_id } = router.query
  
  let groupArray = [];
  let flowIds = [];
  let currentOutput = output ? output[0] : null;

  const itemElements = flowsOutputs.map(item => {
    
  let currentFlow = [];
  if (item != null){
    currentFlow = allFlows.find(flow => flow.id == item.flow)
  }

       return (
       <PrettyBlock key={currentFlow.id} blockBody={currentFlow.flow} 
         blockLink={'/flow/' + currentFlow.id}  />
         )
     }
    )


  return (
  	<>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={currentOutput.output} titleDescription={currentOutput.description}
     colorBg={getRandomGradient()} />
    </div>
    <div className="flex space-between">
    {/*<aside className="h-screen sticky top-0 w-1/5 hidden md:block">
    <div className="pt-20 h-full">
    <TextList items={groupArray} />
    </div>
    </aside>*/}
    <div className="flex-col w-full mx-auto md:w-4/5 mt-14 py-14">
    <h2 className="lg:w-4/5 text-center mx-auto px-6 sm:text-2xl text-xl text-gray-900">
    Get {currentOutput.output.toLowerCase()} by following these flows</h2>
    <div className="flex items-center justify-center w-full mx-auto lg:w-4/5 mt-4">
    {itemElements}
    </div>
    </div>
    </div>
    </>
    )}
}

export async function getStaticPaths() {
  const outputs = await getAllOutputs();
  let outputIds = [];
  outputs.map(output => outputIds.push({params: {output_id: output.id.toString()}}))

  return {
    paths: outputIds,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const products = await getActiveProductsWithPrices();
  const jobGroups = await getAllJobGroups();
  const allFlows = await getAllFlows();
  const flowsOutputs = await getFlowOutputsByOutputId(context.params.output_id);
  // const flowItems = await getFlowItemsByFlowId(flowsOutputs[0].flow);
  const output = await getOutputById(context.params.output_id);

  return {
    props: {
      products,
      jobGroups,
      flowsOutputs,
      output,
      allFlows
    },
    revalidate: 60
  };
}
