import React from 'react';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import Pricing from '../../components/Pricing';
import ListItem from '../../components/ui/ListItem';
import TextList from '../../components/ui/TextList';
import Title from '../../components/ui/Title';
import { getJobToolsByTask, getFlowItemsByJobToolIds,
	getAllJobTools, getFlowsByIds, getTaskById } from '../../utils/supabase-client';
import SquareBlock from '../../components/ui/SquareBlock';
import getRandomGradient from '../../utils/getRandomGradient';

export default function Task({ jobTools, task, flows }) {

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
  let filteredTasks = [];
  let currentTask = task ? task[0] : null
  if (currentTask != null){
  jobTools.map(jobTool => {
    if (jobTool.tool) {
      filteredTools.push(jobTool.tool)
    }
  });
   
  const uniqueGroups = [...new Set(filteredTools.map(tool => tool.category))];
  const flowArray = flows.map(flow => {
  
      return (
      <div className="bg-gray-100 hover:bg-gray-200">
        <SquareBlock key={flow.id} 
      ctaLink={'/flow/' + flow.id} ctaLinkTitle={'→ View'} 
      blockBody={flow.flow} 
       />
       </div>
      )
    } );
  const currentJobGroup = null
  //jobGroups.find(jobGroup => jobGroup.id == currentTask.job_group) 
  
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
    <Title titleTitle={currentTask.job} />
    </div>
    <div className="mt-16 pt-10">
    <div className="flex flex-col lg:flex-row w-full px-6 lg:px-12">
    <div className="w-full lg:w-3/6 mt-2">
    <h2 className="lg:w-4/5 text-center mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    Guides with this task</h2>
    <div className="flex-col w-4/5 mx-auto mt-8">
    {flowArray}
    </div>
    </div>
    {(typeof listTools !== 'undefined' && (listTools.length > 0)) ? (
    <div className="w-full lg:w-2/6 lg:ml-24 mt-8 lg:mt-0">
    <h2 className="lg:w-4/5 text-center mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    Tools to use</h2>
    <div className="flex-col w-full mt-8">
    {listTools}
    </div>
    </div>
    ) : null}
    </div>
    <div className="py-24">
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
  const jobTools = await getJobToolsByTask(context.params.task_id);
  const jobToolIds = jobTools.map(jobTool => jobTool.id);
  const flowItems = await getFlowItemsByJobToolIds(jobToolIds);
  const flowIds = [...new Set(flowItems.map(flowItem => flowItem.flow))];
  const flows = await getFlowsByIds(flowIds);
  //const jobGroups = await getAllJobGroups();
  const task = await getTaskById(context.params.task_id);

  if (!task) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      task,
      jobTools,
      flows
    },
    revalidate: 60
  };
}
