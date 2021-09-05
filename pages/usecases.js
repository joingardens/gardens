import Pricing from '../components/Pricing';
import LightHeroD from '../components/ui/Hero';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import ListItemMirrored from '../components/ui/ListItemMirrored';
import Title from '../components/ui/Title';
import { getActiveProductsWithPrices, getAllJobs, getAllJobGroups, getAllJobTools, getAllTools } from '../utils/supabase-client';
import SquareBlock from '../components/ui/SquareBlock';
import getRandomGradient from '../utils/getRandomGradient';

export default function UseCasePage({ products, jobs, jobGroups, tools, jobTools }) {
  
  let groupArray = []
  const uniqueGroups = [...new Set(jobTools.map(jobTool => jobTool.job))]; 
  const toolsByJob = [...new Set(uniqueGroups.map(group => {
  	return {
  		category: group ? jobs.find(item => item.id == group) : 'Default', 
  		itemArray: jobTools.filter(item => {
  		if (item.job == group){
  			return item
  		} 
  	})} 
  }))];

  	const listJobs = uniqueGroups.map((group) => {
  	const filteredArray = toolsByJob.filter(item => {
      if (item.category.id == group){
        return item
      }
    })
    const itemArray = filteredArray[0].itemArray;
  	const sortedItemArray = itemArray
 	  const itemElements = sortedItemArray.map(item => {
      let currentTool = tools.find(tool => tool.id == item.tool);
      let currentJob = jobs.find(job => job.id == item.job);
      return (
    <SquareBlock key={item.id} blockId={item.id} blockBody={currentJob.job}
    blockDescription={'Using '} 
    blockDescriptionLinkTitle={currentTool.tool ? currentTool.tool : 'No tool'} 
    ctaLink={currentTool.tool ? ('/tool/' + item.tool) : null}
    ctaLinkTitle={'Press to get this done'}
    blockType={(currentTool.model == 1) ? 'Open' : (currentTool.model == 2) ? 'Fair' : (currentTool.model == 4) ? 'Closed' : (currentTool.model == 3) ? 'Exportable' : null} />)

     }
    )
    let currentGroup = jobGroups.find(item => item.id == group)
    let currentGroupTitle = currentGroup ? currentGroup.job_group : 'Default';
    (currentGroupTitle != 'Default') ? groupArray.push(currentGroupTitle) : null

    if (currentGroupTitle != 'Default'){
      return (
    <ListItem key={currentGroupTitle.toString()} 
    categoryName={currentGroupTitle.toString()} emoji={'📘'} 
    categoryDescription={''}>
    {itemElements}
    </ListItem>)
    }

    
  }
  	);

  return (
  	<>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'Use cases'}
    titleDescription={'Execute common tasks using your preferred tools'} 
    colorBg={getRandomGradient()} />
    </div>
    <div className="flex space-between">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:flex">
    <div className="pt-20 h-full">
    <TextList items={groupArray} />
    </div>
    </aside>
    <div className="flex-col w-full w-4/5 mt-14">
    {listJobs}
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

  return {
    props: {
      products,
      jobs,
      jobGroups,
      jobTools,
      tools
    },
    revalidate: 60
  };
}
