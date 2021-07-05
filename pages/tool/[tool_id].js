import React from 'react';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import Pricing from '../../components/Pricing';
import ListItem from '../../components/ui/ListItem';
import TextList from '../../components/ui/TextList';
import { Comments } from '../../components/Comments';
import Title from '../../components/ui/Title';
import { getActiveProductsWithPrices, getJobToolsByTool, 
	getAllJobGroups, getAllJobs, getAllJobTools, getToolById } from '../../utils/supabase-client';
import SquareBlock from '../../components/ui/SquareBlock';
import getRandomGradient from '../../utils/getRandomGradient';

export default function Tool({ products, jobGroups, jobTools, jobs, tool }) {

  const router = useRouter()
   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... 
    <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>
    )
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
    <ListItem key={currentGroupTitle.toString()} categoryName={currentGroupTitle.toString()} 
    emoji={'📂'} categoryDescription={''}>
    {itemElements}
    </ListItem>
    )
  })

  return (
  	<>
    <NextSeo
      title={currentTool.tool + ', a ' + currentTool.category + ' tool'}
      description={currentTool.description}
    />
    <div className="-mb-20 -mt-20">
    <Title titleTitle={currentTool.tool} titleDescription={currentTool.category}
     colorBg={getRandomGradient()} />
    </div>
    <div className="mt-24 pt-10 px-12 lg:px-24">
    <p className="lg:w-3/5 mx-auto sm:text-2xl lg:text-center text-xl text-gray-900 leading-relaxed text-base">
    {currentTool.description}</p>
    <div className="border lg:w-3/5 mx-auto mt-8" />
    </div>
    <div className="flex space-between">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:block">
    <div className="pt-20 h-full">
    <TextList items={groupArray} />
    </div>
    </aside>
    {(typeof listJobs !== 'undefined') ? (
    <div className="w-full md:w-4/5">
    <div className="px-5 mt-32 mb-20 lg:w-4/5 mx-auto">
    <h2 className="lg:w-4/5 mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    Things you can do with {currentTool.tool}</h2>
    {listJobs}
    <Comments postId={tool_id} />
    </div>
    </div>
    ) : null}
    </div>
    </>
    )}}
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
