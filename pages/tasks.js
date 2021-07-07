import Pricing from '../components/Pricing';
import LightHeroD from '../components/ui/Hero';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import ListItemMirrored from '../components/ui/ListItemMirrored';
import Title from '../components/ui/Title';
import { getActiveProductsWithPrices, getAllJobs, getAllJobGroups, getAllJobTools } from '../utils/supabase-client';
import SquareBlock from '../components/ui/SquareBlock';
import getRandomGradient from '../utils/getRandomGradient';

export default function JobsPage({ products, jobs, jobGroups, jobTools }) {
  
  let groupArray = []
  const uniqueGroups = [...new Set(jobs.map(job => job.job_group))]; 
  const jobsByCategory = [...new Set(uniqueGroups.map(group => {
  	return {
  		category: group ? jobGroups.find(item => item.id == group) : 'Default', 
  		itemArray: jobs.filter(item => {
  		if (item.job_group == group){
  			return item
  		} 
  	})} 
  }))];

  	const listJobs = uniqueGroups.map((group) => {
  	const filteredArray = jobsByCategory.filter(item => {
      if (item.category.id == group){
        return item
      }
    })
    const itemArray = filteredArray[0].itemArray;
  	const sortedItemArray = itemArray
 	  const itemElements = sortedItemArray.map(item => {
       let currentJobTool = jobTools.find(jobTool => jobTool.job == item.id)
       return (<SquareBlock key={item.id} blockBody={item.job} 
         ctaLink={(currentJobTool) ? ('/usecases#' + currentJobTool.id) : null} 
         ctaLinkTitle={'Learn more'}
         blockType={''} />)
     }
    )
    let currentGroup = jobGroups.find(item => item.id == group)
    let currentGroupTitle = currentGroup ? currentGroup.job_group : 'Default'
    groupArray.push(currentGroupTitle)

    return (
    <ListItem key={currentGroupTitle.toString()} categoryName={currentGroupTitle.toString()} emoji={'📂'} categoryDescription={''}>
    {itemElements}
    </ListItem>)
  }
  	);

  return (
  	<>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'Tasks'} 
    titleDescription={'All tasks, sorted by task group'} 
    colorBg={getRandomGradient()} />
    </div>
    <div className="flex space-between">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:block">
    <div className="pt-20 h-full">
    <TextList items={groupArray} />
    </div>
    </aside>
    <div className="flex-col w-full md:w-4/5 mt-14">
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
  const jobGroups = await getAllJobGroups();
  const jobTools = await getAllJobTools();

  return {
    props: {
      products,
      jobs,
      jobGroups,
      jobTools
    },
    revalidate: 60
  };
}
