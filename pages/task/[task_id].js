import React from 'react';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import Pricing from '../../components/Pricing';
import ListItem from '../../components/ui/ListItem';
import TextList from '../../components/ui/TextList';
import { Comments } from '../../components/Comments';
import Title from '../../components/ui/Title';
import { getActiveProductsWithPrices, getJobToolsByTask, 
	getAllJobGroups, getAllJobTools, getTaskById } from '../../utils/supabase-client';
import SquareBlock from '../../components/ui/SquareBlock';
import getRandomGradient from '../../utils/getRandomGradient';

export default function Tool({ products, jobGroups, jobTools, task }) {

  const router = useRouter()
   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... 
    <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>
    )
  } else {
  const { task_id } = router.query
  let groupArray = [];
  let filteredTools = [];
  let currentTask = task ? task[0] : null
  if (currentTask != null){
  jobTools.map(jobTool => { 
    if (jobTool.tool) {
      filteredTools.push(jobTool.tool)
    }
  });
   
  const uniqueGroups = [...new Set(filteredTools.map(tool => tool.category))];
  
  const currentJobGroup = jobGroups.find(jobGroup => jobGroup.id == currentTask.job_group) 
  
  const listTools = filteredTools.map(item => {
       let currentJobTool = jobTools.find(jobTool => jobTool.tool.id == item.id)
       return (<SquareBlock key={item.id} blockBody={item.tool} 
       smallImage={item.logo_url} smallImageAlt={item.tool + ' logo'}
       ctaLink={('/tool/' + item.id)}
       ctaLinkTitle={'Learn more'}
       blockDescription={item.category}
       blockType={(item.model == 1) ? 'Open' : (item.model == 2) ? 'Fair' : (item.model == 4) ? 'Closed' : (item.model == 3) ? 'Exportable' : null} /> 
       )
     }
    )

  const listJobTools = filteredTools.map(item => {
       let currentJobTool = jobTools.find(jobTool => jobTool.tool.id == item.id)
       return (<SquareBlock key={item.id} blockBody={item.tool} 
       smallImage={item.logo_url} smallImageAlt={item.tool + ' logo'}
       ctaLink={('/tool/' + item.id)}
       ctaLinkTitle={'Learn more'}
       blockDescription={item.category}
       blockType={(item.model == 1) ? 'Open' : (item.model == 2) ? 'Fair' : (item.model == 4) ? 'Closed' : (item.model == 3) ? 'Exportable' : null} /> 
       )
     }
    )

  return (
  	<>
    <NextSeo
      title={currentTask.job + ': an Ultimate Guide'}
      description={currentTask.job + ' with different tools following our step-by-step instructions.'}
    />
    <div className="-mb-20 -mt-20">
    <Title titleTitle={currentTask.job} titleDescription={currentJobGroup ? (currentJobGroup.job_group) : 'Default'}
     colorBg={getRandomGradient()} />
    </div>
    <div className="mt-24 pt-10">
    <div className="flex flex-col lg:flex-row w-full items-center px-6 lg:px-12">
    <div className="w-full lg:w-3/6">
    <p className="lg:w-4/5 mx-auto sm:text-2xl lg:text-center text-xl text-gray-900 leading-relaxed text-base">
    {currentTask.description ? currentTask.description : "There's nothing in here... for now. Add a description or start the discussion in comments below!"}
    </p>
    <div className="border lg:w-4/5 mx-auto mt-8" />
    </div>
    {(typeof listTools !== 'undefined' && (listTools.length > 0)) ? (
    <div className="w-full lg:w-2/6 lg:ml-24 mt-8 lg:mt-0">
    <h2 className="lg:w-4/5 text-center mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    Tools to use</h2>
    <div className="flex-col w-full mt-4">
    {listTools}
    </div>
    </div>
    ) : null}
    </div>
    <div className="py-24">
    <Comments postId={parseInt('888' + task_id)} />
    </div>
    </div>
    </>
    )}}
}

export async function getStaticPaths() {
  const allJobTools = await getAllJobTools();
  let jobToolIds = [];
  allJobTools.map(jobtool => jobToolIds.push({params: {task_id: jobtool.job.toString()}}))

  return {
    paths: jobToolIds,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const products = await getActiveProductsWithPrices();
  const jobTools = await getJobToolsByTask(context.params.task_id);
  const jobGroups = await getAllJobGroups();
  const task = await getTaskById(context.params.task_id);

  if (!task) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products,
      task,
      jobGroups,
      jobTools
    },
    revalidate: 60
  };
}
