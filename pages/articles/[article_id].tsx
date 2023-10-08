import { getArticleById, getPublishedDrafts, getPersonalDetailsByUserId } from '../../utils/supabase-client';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mastodonAdapter } from "../../adapters/other-apps/mastodon/adapter";

import Image from 'next/image';

export default function Article({ article, user }) {
   
   const router = useRouter();
   const [loading, setLoading] = useState(true);
   const [repliesList, setRepliesList] = useState([]);
   const [postReplies, setPostReplies] = useState([]);
   const [parentUri, setParentUri] = useState("");

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
    if (article[0].mastodon_id) {
    getPostReplies(article[0].mastodon_id);      
    }
  }, [article]);

  useEffect(() => {
    if (repliesList){

    const finalRepliesList = repliesList.map(reply => (
    <a href={reply.uri} className="hover:bg-gray-50 mt-4" target="_blank">
    <div className="w-full flex border shadow rounded px-2 py-2">
    <div className="md:w-20 md:h-20 w-12 h-12 relative ml-2 my-2">
    <Image src={reply.account.avatar} alt={reply.account.display_name} 
            layout='fill' objectFit='contain' objectPosition='center center' />
    </div>
    <div className="flex flex-col overflow-hidden">
    <p className="px-4 text-lg font-semibold pt-3">{reply.account.display_name}</p>
    <div className="prose px-4 overflow-hidden py-2" dangerouslySetInnerHTML={{__html: reply.content}}/>
    </div>
    </div>
    </a>
    ))
    setPostReplies(finalRepliesList)
  }
  }, [repliesList]);

  

   useEffect(() => {
      setLoading(!loading);
   }, []) 
   
    if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... 
    <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>
    )
  } else {
      return (
        <div className={`p-6 w-full flex flex-col justify-center`}>
        <div className="flex flex-col md:flex-row md:w-3/5 mx-auto items-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold text-gray-900">{article[0].draftName}
        <br className="hidden lg:inline-block"/>
      </h1>
        {(user[0].full_name || user[0].username) ? (
      <div className="w-64 md:w-48 md:py-4 md:px-2 flex mx-auto md:flex-col justify-center items-center">
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
        {(article && article[0].payload && !loading) ? 
        // (JSON.stringify(article[0].payload))
        (<>
          <div className="-mt-48 pb-24 pt-4 px-2 w-full justify-center flex flex-col z-40">
    <h2 className="px-9 sm:text-2xl text-center text-xl font-semibold text-gray-900 bg-green-50 py-1">
    Comments</h2>
    {(parentUri && parentUri.length > 0) ? (
      <h3 className="text-2xl text-center my-3">Add a comment by replying to this post <br/> in the <a className="text-blue-700 underline font-bold" href={parentUri} target="_blank">Gardens Community</a></h3>
    ) : null}
    <div className="md:w-1/2 w-4/5 flex flex-col mx-auto">
    {(postReplies && postReplies.length > 0) ? postReplies : null}
    </div>
    </div>
    </>) 
        : null}
        </div>
    )
  }
}


export async function getStaticPaths() {
  const allPublishedDrafts = await getPublishedDrafts();
  let publishedDraftIds = [];
  allPublishedDrafts.map(publishedDraft => {
    if (publishedDraft.id){
      publishedDraftIds.push({params: {article_id: publishedDraft.id.toString()}})
    }
    
  })

  return {
    paths: publishedDraftIds,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  
  const article = await getArticleById(context.params.article_id);

  let user = [];

  if (article && article[0].user){
    user = await getPersonalDetailsByUserId(article[0].user);
  }


  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article,
      user
    },
    revalidate: 60
  };
}