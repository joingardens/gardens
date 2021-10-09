import React from 'react';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Pricing from '../../components/Pricing';
import { Comments } from '../../components/Comments';
import Title from '../../components/ui/Title';
import { getFlowItemsByFlowId, 
  getFlowInputsByFlowId, getFlowOutputsByFlowId, getAllFlowIds, getFlowById, getPersonalDetailsByUserId } from '../../utils/supabase-client';
import SquareBlock from '../../components/ui/SquareBlock';
import getRandomGradient from '../../utils/getRandomGradient';
import Image from 'next/image';
import ScaleableImage from "../../components/scaleableImage"

export default function Flow({ flow, user, inputs, outputs, flowRecord, imageDomain }) {

  const router = useRouter()
   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... 
    <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>
    )
  } else {
  const { flow_id } = router.query;

  const allToolTitles = [...new Set(flow.map(item => item.job_tool.tool.tool))];

  const itemInputs = inputs.map(input => {

    const currentInput = input.input;

      return (
      <div className="w-full px-6">
    <SquareBlock key={currentInput.id + '-input'} 
    blockBody={currentInput.input}
    blockDescription={input.description}
     />
     </div>)

     
  });

  let currentOrderNumber = 0;

  const itemElements = flow.map(item => {
      currentOrderNumber += 1;
      let currentJobTool = item.job_tool;
      let currentJob = currentJobTool.job;
      let currentTool = currentJobTool.tool
      let currentImageURLs = [];
      let currentImages = [];

      if (item.image_url){
        currentImageURLs = item.image_url;
        
                currentImages = currentImageURLs.map(imageURL => {
                  return (
                    <ScaleableImage imageDomain={imageDomain} imageURL={imageURL}/>
          )
        })
      }

      // blockDescriptionLinkTitle={currentTool.tool} 
      return (
        <>
    <SquareBlock key={currentJobTool.id} blockId={currentJobTool.id} 
    orderNumber={currentOrderNumber}
    blockBody={currentJob.job}
    blockDescription={item.description} 
        blockType={null} bigImages={currentImages} />
    </>
    )
     }
    )

  const allOutputTitles = [...new Set(outputs.map(output => output.title))];

  const itemOutputs = outputs.map(output => {
  
      return (
      <Link href={"/output/" + output.id}>
      <div key={output.id + '-output'} className="max-w-sm px-6">
    <span className="text-gray-900 font-bold text-2xl">{output.output.output}</span>
    <p className="mt-2">{output.description}</p>
     </div>
     </Link>)

     
  })
  const generatedTitle = (flowRecord[0].flow);
  const generatedDescription = ('Using ' + allToolTitles.toString());
  
  return (
  	<>
    <NextSeo
      title={generatedTitle}
      description={generatedTitle + ' ' + generatedDescription}
    />
    <div className="-mb-20 -mt-20">
    <Title titleTitle={generatedTitle} 
    titleDescription={generatedDescription}
     colorBg={getRandomGradient()} />
    </div>
    <div className="mt-24 pt-10">
    <div className="flex flex-col lg:flex-row w-full items-center px-6 lg:px-12">
    <div className="w-full lg:w-3/5 mx-auto lg:mt-0">
    {(user[0]) ? (
      <div class="flex flex-col items-center 
      relative md:absolute md:top-0 md:right-0 md:mt-64 md:mr-4 lg:mr-8 z-30 px-12 py-4 mb-6 bg-gray-50 rounded w-64 mx-auto">
      <h3 className="font-medium text-lg">Author</h3>
      <div className="relative h-32 w-24 mb-2">
      <Image src={user[0].avatar_url}
      layout='fill'
      objectFit='contain' />
      </div>
      <h3 className="font-semibold text-lg">{user[0].full_name}</h3>
      <span className="text-gray-700 font-light">{user[0].username}</span>
      </div>
      ) : null}
    {(inputs && inputs.length != 0) ? (
    <div className="md:max-w-xl md:pr-28 lg:pr-0 lg:max-w-full md:ml-0 lg:mx-auto z-20">
    <h2 className="md:w-5/6 text-center mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    Use</h2>
    <div className="flex flex-col items-center justify-center w-full mx-auto lg:w-5/6 mt-4">
    {itemInputs}
    </div>
    </div>) : null}
    <div className="mx-auto w-24 flex justify-center items-center mt-8">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"/></svg>
    </div>
    <div className="py-8">
    <h2 className="lg:w-4/5 text-center mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    To do this</h2>
    <div className="flex-col w-full mt-4">
    {itemElements}
    </div>
    <div className="mx-auto w-24 flex justify-center items-center mt-8">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"/></svg>
    </div>
    </div>
    <h2 className="text-center mx-auto px-6 mb-6 sm:text-2xl text-xl font-semibold text-gray-900">
    And get a...</h2>    
    <div className={`${getRandomGradient()} px-6 max-w-md mx-auto py-6 shadow border border-black rounded hover:shadow-lg transition`}>
    <div className="flex items-center justify-center w-full mx-auto ">
    {itemOutputs}
    </div>
    </div>
    </div>
    </div>
    <div className="py-24">
    <Comments postId={parseInt('888' + flow_id)} />
    </div>
    </div>
    </>
    )}
  }

export async function getStaticPaths() {
  const allFlowIds = await getAllFlowIds();
  const uniqueIds = [...new Set(allFlowIds.map(id => id))];
  let flowPaths = [];
  let flowIds = uniqueIds.map(flowId => flowPaths.push({params: {flow_id: flowId.flow.toString()}}))

  return {
    paths: flowPaths,
    fallback: true,
  }
}

export async function getStaticProps(context) {

  let user = [];
  
  const flow = await getFlowItemsByFlowId(context.params.flow_id);
  const flowRecord = await getFlowById(context.params.flow_id);
  if (flowRecord[0].author){
    user = await getPersonalDetailsByUserId(flowRecord[0].author);
  }
  const inputs = await getFlowInputsByFlowId(context.params.flow_id);
  const outputs = await getFlowOutputsByFlowId(context.params.flow_id);
  const imageDomain = process.env.IMAGES_DOMAIN_2;

  if (!flow) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      flow,
      user,
      inputs,
      outputs,
      flowRecord, 
      imageDomain
    },
    revalidate: 60
  };
}
