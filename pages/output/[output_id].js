import { useRouter } from 'next/router'
import Pricing from '../../components/Pricing';
import LightHeroD from '../../components/ui/Hero';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import ListItem from '../../components/ui/ListItem';
import TextList from '../../components/ui/TextList';
import ListItemMirrored from '../../components/ui/ListItemMirrored';
import Title from '../../components/ui/Title';
import { getActiveProductsWithPrices, 
  getAllJobs, getAllJobGroups, 
  getAllJobTools, getAllTools, 
  getAllFlowsOutputs, getAllFlowItems, 
  getAllOutputs, getAllFlows, getOutputById } from '../../utils/supabase-client';
//import MyDisclosure from '@/components/dynamic/disclosure';
import SquareBlock from '../../components/ui/SquareBlock';
import getRandomGradient from '../../utils/getRandomGradient';

export default function Output({ products, jobs, 
  jobGroups, tools, jobTools, 
  flowsOutputs, flowItems, outputs, output }) {

  const router = useRouter()
   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>)
  } else {
  const { output_id } = router.query
  let groupArray = [];
  let flowIds = [];
  let currentOutput = output ? output[0] : null
  if (currentOutput != null){
  flowsOutputs.map(flowOutput => (flowOutput.output == currentOutput.id) ? flowIds.push(flowOutput.flow) : null);
  const filteredFlowItems = flowItems.filter(flowItem => flowIds.includes(flowItem.flow))

  const uniqueFlows = [...new Set(filteredFlowItems.map(flowItem => flowItem.flow))]; 
  const jobToolsByFlow = [...new Set(uniqueFlows.map(flow => {
    return {
      category: flow ? flowsOutputs.find(item => item.flow == flow) : 'Default', 
      itemArray: flowItems.filter(item => {
      if (item.flow == flow){
        return item
      } 
    })} 
  }))];


    const listJobTools = uniqueFlows.map((flow) => {
    const filteredArray = jobToolsByFlow.filter(item => {
      if (item.category.id == flow){
        return item
      }
    })
    const itemArray = filteredArray[0].itemArray;
    const sortedItemArray = itemArray

    let currentOrderNumber = 0;

     const itemElements = sortedItemArray.map(item => {
      currentOrderNumber += 1;
      let currentJobTool = jobTools.find(jobTool => jobTool.id == item.job_tool)
      
      let currentTool = tools.find(tool => tool.id == currentJobTool.tool);

      let currentJob = jobs.find(job => job.id == currentJobTool.job)
      return (
    <SquareBlock key={item.id} blockId={item.id} 
    orderNumber={currentOrderNumber}
    blockBody={currentJob.job}
    blockDescription={'Using '} 
    blockDescriptionLinkTitle={currentTool.tool} 
    ctaLink={currentTool ? ('/tool/' + currentTool.id) : null}
    ctaLinkTitle={'Press to get this done'}
    blockType={(currentTool.model == 1) ? 'Open' : (currentTool.model == 2) ? 'Fair' : (currentTool.model == 4) ? 'Closed' : (currentTool.model == 3) ? 'Exportable' : null} />)

     }
    )

    let currentGroup = flowsOutputs.find(item => item.output == filteredArray[0].category.output)

    let currentGroupTitle = currentGroup ? currentGroup.title : 'Default'
    groupArray.push(currentGroupTitle)

    return (
    <ListItem key={currentGroupTitle.toString()} categoryName={currentGroupTitle.toString()}

    categoryDescription={''}>
    {itemElements}
    </ListItem>)
  }
    );
}
  return (
  	<>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={currentOutput.output} titleDescription={currentOutput.description}
     colorBg={getRandomGradient()} />
    </div>
    <div className="flex space-between">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:block">
    <div className="pt-20 h-full">
    <TextList items={groupArray} />
    </div>
    </aside>
    <div className="flex-col w-full md:w-4/5 mt-14">
    {(typeof listJobTools !== 'undefined') ? listJobTools : null}
    </div>
    </div>
    {/*<ParagraphWithButton />
    <Pricing products={products} />*/}
    )
    
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
  const jobs = await getAllJobs();
  const tools = await getAllTools();
  const jobGroups = await getAllJobGroups();
  const jobTools = await getAllJobTools();
  const flowsOutputs = await getAllFlowsOutputs();
  const flowItems = await getAllFlowItems();
  const output = await getOutputById(context.params.output_id)

  return {
    props: {
      products,
      jobs,
      jobGroups,
      jobTools,
      tools,
      flowsOutputs,
      flowItems,
      output
    },
    revalidate: 60
  };
}
