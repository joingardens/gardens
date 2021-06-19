import { useRouter } from 'next/router'
import Head from 'next/head'
import Pricing from '@/components/Pricing';
import LightHeroD from '@/components/ui/Hero';
import ParagraphWithButton from '@/components/ui/ParagraphWithButton';
import ListItem from '@/components/ui/ListItem';
import TextList from '@/components/ui/TextList';
import ListItemMirrored from '@/components/ui/ListItemMirrored';
import Title from '@/components/ui/Title';
import { getActiveProductsWithPrices, getJobToolsByTool, 
	getAllJobGroups, getAllJobs, getAllJobTools, getToolById } from '@/utils/supabase-client';
//import MyDisclosure from '@/components/dynamic/disclosure';
import SquareBlock from '@/components/ui/SquareBlock';
import getRandomGradient from '@/utils/getRandomGradient';

export default function Tool({ products, jobGroups, jobTools, jobs, tool }) {

  const router = useRouter()
   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>)
  } else {
  const { tool_id } = router.query
  let groupArray = [];
  let toolIds = [];
  let currentTool = tool ? tool[0] : null
  if (currentTool != null){
  jobTools.map(jobTool => toolIds.push(jobTool.job));
  const filteredJobs = jobs.filter(job => toolIds.includes(job.id))
  const uniqueGroups = [...new Set(filteredJobs.map(job => job.job_group))]; 
  const jobsByCategory = [...new Set(uniqueGroups.map(group => {
  	return {
  		category: group ? jobGroups.find(item => item.id == group) : 'Default', 
  		itemArray: filteredJobs.filter(item => {
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
         blockLink={(currentJobTool) ? ('/usecases#' + currentJobTool.id) : null}
         linkTitle={"How-to's"} orderLink={'#pricing'}
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
  }

  return (
  	<>
    <Head>
    <script defer src="https://cdn.commento.io/js/commento.js"></script>
    </Head>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={currentTool.tool} titleDescription={currentTool.category}
     colorBg={getRandomGradient()} />
    </div>
     <div className="flex flex-col text-center w-full my-32">
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{currentTool.description}</p>
    </div>
    <div className="w-full">
    <h2 className="sm:text-3xl text-2xl text-center font-semibold mt-24 text-gray-900">Things you can do with {currentTool.tool}</h2>
    </div>
    <div className="flex space-between">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:block">
    <div className="pt-20 h-full">
    <TextList items={groupArray} />
    </div>
    </aside>
    <div className="flex-col w-full md:w-4/5 mt-14">
    {(typeof listJobs !== 'undefined') ? listJobs : null}
    <div id="commento"></div>
    </div>
    </div>
    {/*<ParagraphWithButton />
    <Pricing products={products} />*/}
    )
    
    </>
    )}
}

export async function getStaticPaths() {
  const allJobTools = await getAllJobTools();
  let jobToolIds = [];
  allJobTools.map(jobtool => jobToolIds.push({params: {tool_id: jobtool.tool.toString()}}))

  return {
    paths: jobToolIds,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const products = await getActiveProductsWithPrices();
  const jobTools = await getJobToolsByTool(context.params.tool_id);
  const jobGroups = await getAllJobGroups();
  const jobs = await getAllJobs();
  const tool = await getToolById(context.params.tool_id)

  if (!tool) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products,
      jobs,
      jobGroups,
      jobTools,
      tool
    },
    revalidate: 60
  };
}
