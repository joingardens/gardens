import { getArticleById, getPublishedDrafts } from '../../utils/supabase-client';
import { useRouter } from "next/router";
import { EDITOR_JS_TOOLS } from '../../components/writer/tools'
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"
import Link from "next/link";
//import { useUser } from "../../utils/useUser"


export const ReadOnlyEditor = dynamic(() => import("../../components/writer/ReadOnlyEditor"), {
    ssr: false,
  });

export default function Article({ article }) {
    //const {userLoaded, user} = useUser()
   const router = useRouter();
   const [loading, setLoading] = useState(true);
   
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
        {(article[0].payload && !loading && window) ? (<ReadOnlyEditor data={article[0].payload} tools={EDITOR_JS_TOOLS} />) : null}
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

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article
    },
    revalidate: 60
  };
}
