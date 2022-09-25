import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useUser } from '../../utils/useUser';
import { NextSeo } from 'next-seo';
import Pricing from '../../components/Pricing';
import ListItem from '../../components/ui/ListItem';
import TextList from '../../components/ui/TextList';
import Title from '../../components/ui/Title';
import { getJobToolsByTool, 
	getAllJobGroups, getAllJobs, getAllJobTools, getToolById, getFlowItemsByJobToolIds, 
  getFlowsByIds, getPaasByUserId, getDropletsByPaasId, insertUserApp } from '../../utils/supabase-client';
import SquareBlock from '../../components/ui/SquareBlock';
import getRandomGradient from '../../utils/getRandomGradient';
import Link from "next/link";


export default function Tool({ jobGroups, jobTools, jobs, tool, flows }) {
  
  const { user, subscription } = useUser();
  const [installOpen, setInstallOpen] = useState(false);
  const [dropletDomain, setDropletDomain] = useState("");
  const [userDropletId, setUserDropletId] = useState("")

  async function getCaptainAppURL(user_id){
    const paasResponse = await getPaasByUserId(user_id);
    const dropletResponse = await getDropletsByPaasId(paasResponse[0].id);
    if (dropletResponse[0]){
      setDropletDomain(dropletResponse[0].domain);
      setUserDropletId(dropletResponse[0].id)
    }
  }

  async function addToDashboard(user_droplet_id, tool_id){
    if (user_droplet_id && tool_id){
      const insertionResponse = await insertUserApp(user_droplet_id, tool_id);
      if (insertionResponse){alert("App added successfuly! Check on your apps page")}
    }
  }


  useEffect(() => {
    if (user){
      getCaptainAppURL(user.id);
    }
  }, [user])

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
  		category: group ? jobGroups.find(item => item.id == group) : 'General', 
  		itemArray: filteredJobs.filter(item => {
  		if (item.job_group == group){
  			return item
  		} 
  	})} 
  }))];
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
         blockLink={(currentJobTool) ? ('/task/' + currentJobTool.job) : null}
         linkTitle={"How-to's"}
         blockType={''} />)
     }
    )

    let currentGroup = jobGroups.find(item => item.id == group)
    let currentGroupTitle = currentGroup ? currentGroup.job_group : 'General'
    groupArray.push(currentGroupTitle)

    return (
    <ListItem key={currentGroupTitle ? currentGroupTitle.toString() : ""} categoryName={currentGroupTitle ? currentGroupTitle.toString() : ""} 
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
     colorBg={getRandomGradient()} smallImage={currentTool.logo_url} />
    <div className="flex flex-col w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto mt-8 md:mt-4 md:mb-16">
    {currentTool.link ? (
      <>
      <Link href={currentTool.link}>
          <a target="_blank"  style={{textDecoration: 'none'}} 
          className="w-full border shadow text-2xl hover:bg-green-200 py-2 px-2 mx-auto focus:outline-none rounded">
            🌐 {currentTool.tool} website
          </a>
    </Link>
    </>
    ) : null}
    {user ? (subscription ? (
      <>
      <a  onClick={() => addToDashboard(userDropletId, currentTool.id)} style={{textDecoration: 'none', fontWeight: 600}} 
          className="w-full cursor-pointer bg-blue-400 shadow border text-white text-2xl hover:bg-blue-500 py-2 mt-2 px-2 mx-auto focus:outline-none rounded">
            ➕ Add to My Apps
      </a>
      <a  onClick={() => setInstallOpen(!installOpen)} style={{textDecoration: 'none', fontWeight: 600}} 
          className="w-full cursor-pointer bg-green-500 shadow border text-white text-2xl hover:bg-green-600 py-2 mt-2 px-2 mx-auto focus:outline-none rounded">
            💻 Install {currentTool.tool}
      </a>
          </>
          ) : (
          <>
          <Link href="/onboarding"><a style={{textDecoration: 'none', fontWeight: 600}} 
          className="w-full bg-green-500 shadow border text-white text-2xl hover:bg-green-600 py-2 mt-2 px-2 mx-auto focus:outline-none rounded">
            💻 Self-host {currentTool.tool}
          </a></Link>
          </>
          )) : (
          <><Link href="/apps"><a style={{textDecoration: 'none', fontWeight: 600}} 
          className="w-full bg-green-500 shadow border text-white text-2xl hover:bg-green-600 py-2 mt-2 px-2 mx-auto focus:outline-none rounded">
            💻 Self-host {currentTool.tool}
          </a></Link>
          </>)}
     {installOpen ? (
       dropletDomain.length > 0 ? (<div className="p-2 mt-4 bg-gray-50 duration-150">
       <p className="font-semibold text-center">
       Are you sure you want to install {currentTool.tool}?
       </p>
       <p className="text-center">
       To configure this app and confirm installation <a className="text-blue-600 underline font-bold" href={"https://captain." + dropletDomain + "/#/apps/oneclick/" + (currentTool.caprover_id ? currentTool.caprover_id : currentTool.gardens_id)} target="_blank">press here. </a>
       </p>
       <p className="mt-2 text-gray-500 text-center">If the link doesn't work, press "Remember me" and "Use localStorage", then try again</p>
       </div>) : (
       <div className="p-2 mt-4 bg-gray-50 duration-150">
       <p className="font-semibold text-center">
       Couldn't find a droplet.
       </p>
       <p className="text-center">
       Did you <Link href="/onboarding/provision"><a className="text-blue-600 underline font-bold">create a droplet yet?</a></Link>
       </p>
       </div>)
       ) : null}
    </div>
    </div>
    {currentTool.description ? (
    <div className="mt-6 pt-24 md:pt-10 px-12 lg:px-24">
    <div className="border lg:w-3/5 mx-auto mb-8 mt-4" />
    <p className="lg:w-3/5 mx-auto sm:text-2xl lg:text-center text-xl text-gray-900 leading-relaxed text-base">
    {currentTool.description}
    </p>
    <div className="border lg:w-3/5 mx-auto mb-4 mt-8" />
    </div>) : null}
    {(flowArray.length > 0) ? (
    <div className="w-full lg:w-3/6 mx-auto mt-32 py-4">
    <h2 className="lg:w-4/5 text-center mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    Step-by-step guides for {currentTool.tool}</h2>
    <div className="flex-col w-4/5 mx-auto mt-8">
    {flowArray}
    </div>
    </div>
    ) : null}
    <div className="flex space-between">
    {(typeof listJobs !== 'undefined' && (listJobs.length > 0)) ? (
    <aside className="h-screen sticky top-0 w-1/5 hidden md:block">
    <div className="pt-20 h-full">
    <TextList items={groupArray} />
    </div>
    </aside>
    ) : null}
    <div className={`w-full ${(typeof listJobs !== 'undefined' && (listJobs.length > 0)) ? 'md:w-4/5' : null}`}>
    <div className="px-5 mt-32 mb-20 lg:w-4/5 mx-auto">
    {(typeof listJobs !== 'undefined' && (listJobs.length > 0)) ? (
    <h2 className="lg:w-4/5 mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    Things you can do with {currentTool.tool}</h2>
    ) : null}
    {listJobs}
    </div>
    </div>
    </div>
    </>
    )}}
}

export async function getStaticPaths() {
  const allJobTools = await getAllJobTools();
  let jobToolIds = [];
  allJobTools.map(jobtool => {
    if (jobtool.tool){
      jobToolIds.push({params: {tool_id: jobtool.tool.toString()}})
    }
    
  })

  return {
    paths: jobToolIds,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const jobTools = await getJobToolsByTool(context.params.tool_id);
  const jobToolIds = jobTools.map(jobTool => jobTool.id);
  const flowItems = await getFlowItemsByJobToolIds(jobToolIds);
  const flowIds = [...new Set(flowItems.map(flowItem => flowItem.flow))];
  const flows = await getFlowsByIds(flowIds);
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
      jobs,
      jobGroups,
      jobTools,
      tool, 
      flows
    },
    revalidate: 60
  };
}
