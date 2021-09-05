import Pricing from '../components/Pricing';
import LightHeroD from '../components/ui/Hero';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import ListItemMirrored from '../components/ui/ListItemMirrored';
import Title from '../components/ui/Title';
import { getActiveProductsWithPrices, 
  getAllJobs, getAllJobGroups, 
  getAllJobTools, getAllTools, 
  getAllFlowsOutputs, getAllFlowItems, getAllOutputs } from '../utils/supabase-client';
//import MyDisclosure from '@/components/dynamic/disclosure';
import SquareBlock from '../components/ui/SquareBlock';
import getRandomGradient from '../utils/getRandomGradient';

export default function FlowPage({ products, jobs, 
  jobGroups, tools, jobTools, flowsOutputs, flowItems, outputs }) {
  
  let outputArray = []
  const uniqueFlows = [...new Set(flowItems.map(flowItem => flowItem.flow))]; 
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
      if (item.category.flow == flow){
        return item
      }
    })

    const itemArray = filteredArray[0] && filteredArray[0].itemArray ? filteredArray[0].itemArray : [];
  	const sortedItemArray = itemArray

    let currentOrderNumber = 0;

 	  const itemElements = sortedItemArray.map(item => {
      currentOrderNumber += 1;
      let currentJobTool = jobTools.find(jobTool => jobTool.id == item.job_tool)
      //console.log(currentJobTool)
      let currentTool = tools.find(tool => tool.id == currentJobTool.tool);
      let currentJob = jobs.find(job => job.id == currentJobTool.job)
      return (
    <SquareBlock key={item.id} blockId={item.id} 
    orderNumber={currentOrderNumber}
    blockBody={currentJob.job}
    blockDescription={'Using '} 
    blockDescriptionLinkTitle={currentTool.tool} 
    ctaLink={currentTool ? ('/task/' + currentJob.id) : null}
    ctaLinkTitle={'Press to get this done'}
    blockType={(currentTool.model == 1) ? 'Open' : (currentTool.model == 2) ? 'Fair' : (currentTool.model == 4) ? 'Closed' : (currentTool.model == 3) ? 'Exportable' : null} />)

     }
    )

    let currentOutput = outputs.find(item => item.id == filteredArray[0]?.category?.output)

    let currentOutputTitle = currentOutput ? currentOutput.output : 'Default'
    outputArray.push(currentOutputTitle)

    return (
    <ListItem key={currentOutputTitle.toString()} categoryName={currentOutputTitle.toString()}

    categoryDescription={currentOutput?.description}>
    {itemElements}
    </ListItem>)
  }
  	);

  return (
  	<>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'Flows'}
    titleDescription={'Get an output following a sequence of tasks'} 
    colorBg={getRandomGradient()} />
    </div>
    <div className="flex space-between">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:flex">
    <div className="pt-20 h-full">
    <TextList items={outputArray} />
    </div>
    </aside>
    <div className="flex-col w-full w-4/5 mt-14">
    {listJobTools}
    </div>
    </div>
  	{/*<ParagraphWithButton />
  	<Pricing products={products} />*/}
    </>
    )
}

export async function getStaticProps() {
  const products = await getActiveProductsWithPrices();
  const jobs = await getAllJobs();
  const tools = await getAllTools();
  const jobGroups = await getAllJobGroups();
  const jobTools = await getAllJobTools();
  const flowsOutputs = await getAllFlowsOutputs();
  const flowItems = await getAllFlowItems();
  const outputs = await getAllOutputs();

  return {
    props: {
      products,
      jobs,
      jobGroups,
      jobTools,
      tools,
      flowsOutputs,
      flowItems,
      outputs
    },
    revalidate: 60
  };
}
