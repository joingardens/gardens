import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import updateFieldHeight from '../../utils/autosize';
import { NextSeo } from 'next-seo';
import { mastodonAdapter } from "../../adapters/other-apps/mastodon/adapter";
import Link from 'next/link';
import Pricing from '../../components/Pricing';
import Title from '../../components/ui/Title';
import { getFlowItemsByFlowId, 
  getFlowInputsByFlowId, getFlowOutputsByFlowId, getAllFlowIds, getFlowById, getPersonalDetailsByUserId } from '../../utils/supabase-client';
import SquareBlock from '../../components/ui/SquareBlock';
import getRandomGradient from '../../utils/getRandomGradient';
import Image from 'next/image';
import ScaleableImage from "../../components/scaleableImage"

export default function Flow({ flow, user, inputs, outputs, flowRecord, imageDomain }) {

  const router = useRouter();
  const [commentContents, setCommentContents] = useState("");
  const [repliesList, setRepliesList] = useState([]);
  const [postReplies, setPostReplies] = useState([]);
  const [parentUri, setParentUri] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getPostReplies(mastodonId){

      const repliesResponse = await mastodonAdapter.getRepliesByStatusId(mastodonId)
      if(repliesResponse){
      const replies = repliesResponse.data.descendants;
      setRepliesList(replies); 
      const parentResponse = await mastodonAdapter.getStatusById(mastodonId);
      if (parentResponse){
      setParentUri(parentResponse.data.uri);
      }
      } 
      }

  useEffect(() => {
    if (flowRecord[0].mastodon_id) {
    getPostReplies(flowRecord[0].mastodon_id);      
    }
  }, [flowRecord]);

  useEffect(() => {
    if (repliesList){

    const finalRepliesList = repliesList.map(reply => (
    <a href={reply.uri} className="hover:bg-gray-50 mt-4" target="_blank">
    <div className="w-full flex border shadow rounded px-2 py-2">
    <div className="md:w-20 md:h-20 w-12 h-12 relative ml-2 my-2">
    <Image src={reply.account.avatar} alt={reply.account.display_name} 
            layout='fill' objectFit='contain' objectPosition='center center' />
    </div>
    <div className="flex flex-col">
    <p className="px-4 text-lg font-semibold pt-3">{reply.account.display_name}</p>
    <div className="text-lg pl-5 max-w-sm py-2" dangerouslySetInnerHTML={{__html: reply.content}}/>
    </div>
    </div>
    </a>
    ))
    setPostReplies(finalRepliesList)
  }
  }, [repliesList]);

  

  function handleChange(e) {
    setCommentContents(e.target.value);
    if (textareaRef?.current) {
      updateFieldHeight(textareaRef.current);
    }
  }

   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... 
    <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>
    )
  } else {
  const { flow_id } = router.query;

  const allToolTitles = flow.map(item => {
  return ({
      toolTitle: item.job_tool.tool.tool,
      toolLink: item.job_tool.tool.link,
      toolId: item.job_tool.tool.id,
      toolOneClick: item.job_tool.tool.one_click
    })  
  });

  const itemInputs = inputs.map(input => {

    const currentInput = input.input;

      return (
      <div className="w-full">
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
      <Link href={"/output/" + output.output.id}>
      <div key={output.id + '-output'} className="max-w-sm px-6">
    <span className="text-gray-900 font-bold text-2xl">{output.output.output}</span>
    <p className="mt-2">{output.description}</p>
     </div>
     </Link>)

     
  })
  const generatedTitle = (flowRecord[0].flow);

  let uniqueToolTitles = [];
  allToolTitles.filter(function(item){
  var i = uniqueToolTitles.findIndex(x => (x.toolLink == item.toolLink && x.toolTitle == item.toolTitle && x.toolId == item.toolId && x.toolOneClick == item.toolOneClick));
  if(i <= -1){
        uniqueToolTitles.push(item);
  }
  return null;
});

  const toolLinks = uniqueToolTitles.map(tool => (
    <a className="text-blue-600 font-semibold underline mr-2" href={(tool.toolOneClick) ? ('/tool/' + tool.toolId) : tool.toolLink} target="_blank">
    {tool.toolTitle}
    </a>))
  
  return (
  	<>
    <NextSeo
      title={generatedTitle}
      description={generatedTitle}
    />
    <section className="text-gray-600 body-font">
  <div className="container mx-auto flex lg:px-48 py-4 mt-8 md:flex-row flex-col items-center">
    <div className="flex-grow flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold text-gray-900">{generatedTitle}
        <br className="hidden lg:inline-block"/>
      </h1>
     <div>
     Using {toolLinks}
     </div>
    </div>
    {(user[0].full_name || user[0].username) ? (
      <div className="w-64 md:w-48 md:py-4 md:px-2 flex md:flex-col justify-center items-center">
      <div className="text-lg w-24 md:w-32 mr-4 md:mr-0 text-center">Created by</div>
      <div className="relative h-16 w-16 md:h-32 md:w-32 my-2" >
      {(user[0].avatar_url) ? (
        <Image className="rounded-full" layout="fill" objectFit="cover" alt={user[0].full_name} src={user[0].avatar_url}/>
      ) : null}
      </div>
      <div className="flex flex-col items-center md:ml-0 ml-4">
      <h2 className="font-bold text-lg">{user[0].full_name ? user[0].full_name : null}</h2>
      <span>{user[0].username ? user[0].username : null}</span>
      </div>
    </div>
    ) : null}
  </div>
</section>
    <div className="mt-4 pt-10">
    <div className="flex flex-col lg:flex-row w-full items-center px-6 lg:px-12">
    <div className="w-full lg:w-3/5 mx-auto lg:mt-0">
    {(inputs && inputs.length != 0) ? (
    <div className="lg:pr-0 lg:max-w-full md:ml-0 lg:mx-auto z-20">
    <h2 className="px-9 sm:text-2xl text-center text-xl font-semibold text-gray-900 bg-gray-50 py-1">
    You will need</h2>
    <div className="flex flex-col items-start justify-center w-full lg:w-5/6 mt-4">
    {itemInputs}
    </div>
    </div>) : null}
    {/*<div className="mx-auto w-24 flex justify-center items-center mt-8">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"/></svg>
    </div>*/}
    <div className="py-8">
    <h2 className="px-9 sm:text-2xl text-center text-xl font-semibold text-gray-900 bg-gray-50 py-1">
    Step-by-step instructions</h2>
    <div className="flex-col w-full mt-4">
    {itemElements}
    </div>
    {/*<div className="mx-auto w-24 flex justify-center items-center mt-8">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"/></svg>
    </div>*/}
    </div>
    <h2 className="px-9 sm:text-2xl text-center text-xl font-semibold text-gray-900 bg-gray-50 py-1">
    The result</h2>    
    <div className={`bg-white mt-4 px-6 max-w-md mx-auto py-6 shadow border border-black rounded hover:bg-gray-100 cursor-pointer`}>
    <div className="flex flex-col items-center justify-center w-full mx-auto ">
    {itemOutputs}
    </div>
    </div>
    <div className="mx-auto text-center text-gray-600 font-semibold mt-2">↑ Press to view all guides for this result</div>
    </div>
    </div>
    <div className="py-24 max-w-lg px-2  mx-auto flex flex-col">
    {(postReplies && postReplies.length > 0) ? (
    <>
    <h2 className="px-9 sm:text-2xl text-center text-xl font-semibold text-gray-900 bg-gray-50 py-1">
    Comments</h2>
    {(parentUri && parentUri.length > 0) ? (
      <h3 className="text-lg text-center my-3">Add a comment by replying to this post <br/> in the <a className="text-blue-700 underline font-bold" href={parentUri} target="_blank">Gardens Community</a></h3>
    ) : null}
    {postReplies}
      </>) : null}
    
    {/*<h3 className="text-lg font-semibold mx-auto mt-12">Leave a comment</h3>
    <div className="w-full border border-gray-500 p-4 rounded mt-4 my-2">
    <label className="flex-grow flex items-center cursor-text select-none focus-within-ring min-h-14">
            <span className="sr-only">Enter a comment</span>
            <textarea
              className="block bg-transparent flex-grow leading-5 min-h-5 max-h-36 resize-none m-0 px-0 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-300 border-none overflow-auto text-md transition-opacity disabled:opacity-50 focus:outline-none focus:shadow-none focus:ring-0"
              placeholder="Add a comment..."
              rows={1}
              value={commentContents}
              onChange={handleChange}
              ref={textareaRef}
              disabled={isLoading}
            ></textarea>
    </label>
    </div>
    <div className="flex justify-center">
      <button 
            onClick={() => {
              console.log("hoi")
            }}
            className={`bg-green-500 text-white py-1 px-5 mt-4 text-lg hover:bg-green-600  focus:outline-none rounded font-semibold`}>
            Submit
            </button>
    </div>
    */}
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
