import React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Pricing from '../../components/Pricing';
import Title from '../../components/ui/Title';
import { getAllActionIds, getActionById } from '../../utils/supabase-client';
import Image from 'next/image';
import Appsmith from '../../components/Appsmith';

export default function Action({ action }) {

  const router = useRouter()
   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... 
    <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>
    )
  } else {
  const { action_id } = router.query;

  const currentAction = action[0];
  const generatedTitle = currentAction.action;
  const generatedDescription = currentAction.description;
  
  return (
  	<>
    <div className="-mb-20 -mt-20 bg-green-50">
    <Title titleTitle={generatedTitle} 
    titleDescription={generatedDescription} />
    </div>
    <div className="flex mt-24 pt-10 w-full h-full mx-auto items-center px-6 lg:px-12">
    <Appsmith 
    appsrc={currentAction.appsrc} />
    </div>
    </>
    )}
  }

export async function getStaticPaths() {
  const allActionIds = await getAllActionIds();
  let actionPaths = [];
  let actionIds = allActionIds.map(actionId =>
  {
    if (!actionId.isInternal){
      actionPaths.push({params: {action_id: actionId.id.toString()}})
    }
  })

  return {
    paths: actionPaths,
    fallback: true,
  }
}

export async function getStaticProps(context) {

  // user = await getPersonalDetailsByUserId(???);
  const allActions = await getAllActionIds();
  const action = await getActionById(context.params.action_id);

  if (!action) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      allActions,
      action
    },
    revalidate: 60
  };
}
