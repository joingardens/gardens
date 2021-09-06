import React from 'react';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Pricing from '../../components/Pricing';
import { Comments } from '../../components/Comments';
import Title from '../../components/ui/Title';
import { getActiveProductsWithPrices, getFlowItemsByFlowId, 
  getFlowInputsByFlowId, getFlowOutputsByFlowId, getAllFlowIds, getFlowById } from '../../utils/supabase-client';
import SquareBlock from '../../components/ui/SquareBlock';
import getRandomGradient from '../../utils/getRandomGradient';

export default function Flow({ products, flow, inputs, outputs, flowRecord }) {

  const router = useRouter()
   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... 
    <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>
    )
  } else {
  const { flow_id } = router.query

  const allToolTitles = [...new Set(flow.map(item => item.job_tool.tool.tool))];

  const itemInputs = inputs.map(input => {

    const currentInput = input.input;
    console.log(currentInput)

      return (
      <div className="max-w-sm px-6">
    <SquareBlock key={currentInput.id + '-input'} 
    blockBody={currentInput.input}
     />
     </div>)

     
  });

  let currentOrderNumber = 0;

  const itemElements = flow.map(item => {
      currentOrderNumber += 1;
      let currentJobTool = item.job_tool;
      let currentJob = currentJobTool.job;
      let currentTool = currentJobTool.tool
      
      return (
    <SquareBlock key={currentJobTool.id} blockId={currentJobTool.id} 
    orderNumber={currentOrderNumber}
    blockBody={currentJob.job}
    blockDescription={'Using '} 
    blockDescriptionLinkTitle={currentTool.tool} 
    ctaLink={currentJob ? ('/task/' + currentJob.id) : null}
    ctaLinkTitle={'Press to get this done'}
    blockType={(currentTool.model == 1) ? 'Open' : (currentTool.model == 2) ? 'Fair' : (currentTool.model == 4) ? 'Closed' : (currentTool.model == 3) ? 'Exportable' : null} />
    )
     }
    )

  const allOutputTitles = [...new Set(outputs.map(output => output.title))];

  const itemOutputs = outputs.map(output => {
  
      return (
      <Link href={"/output/" + output.id}>
      <div key={output.id + '-output'} className="max-w-sm px-6">
    <span className="text-gray-900 font-bold text-2xl">{output.output.output}</span>
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
    <div className="w-full lg:w-3/5 mx-auto mt-8 lg:mt-0">
    {(inputs && inputs.length != 0) ? (
    <>
    <h2 className="lg:w-4/5 text-center mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    Use</h2>
    <div className="flex items-center justify-center w-full mx-auto lg:w-4/5 mt-4">
    {itemInputs}
    </div>
    </>) : null}
    <div className="mx-auto w-24 flex justify-center items-center mt-4">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"/></svg>
    </div>
    <div className="py-8">
    <h2 className="lg:w-4/5 text-center mx-auto px-6 sm:text-2xl text-xl font-semibold text-gray-900">
    To do this</h2>
    <div className="flex-col w-full mt-4">
    {itemElements}
    </div>
    </div>
    <div className="bg-gray-50 py-12">
    <h2 className="lg:w-4/5 text-center mx-auto px-6 mb-6 sm:text-2xl text-xl font-semibold text-gray-900">
    And get a...</h2>
    <div className={`${getRandomGradient()} px-12 max-w-md mx-auto py-6 shadow hover:shadow-lg`}>
    <div className="flex items-center justify-center w-full mx-auto lg:w-4/5">
    {itemOutputs}
    </div>
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
  
  const products = await getActiveProductsWithPrices();
  const flow = await getFlowItemsByFlowId(context.params.flow_id);
  const flowRecord = await getFlowById(context.params.flow_id);
  const inputs = await getFlowInputsByFlowId(context.params.flow_id);
  const outputs = await getFlowOutputsByFlowId(context.params.flow_id);

  if (!flow) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products,
      flow,
      inputs,
      outputs,
      flowRecord
    },
    revalidate: 60
  };
}
