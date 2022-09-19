import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../utils/useUser";
import Link from "next/link";
import Image from "next/image";
import useToast from "../../components/hooks/useToast";
import Sidebar from '../../components/ui/Sidebar';
import ListItem from '../../components/ui/ListItem';
import TextList from '../../components/ui/TextList';
import ListItemMirrored from '../../components/ui/ListItemMirrored';
import Title from '../../components/ui/Title';
import { getAllFlowItems, getAllFlowItemsWithTools, getAllActions, getFlowsByAuthor } from '../../utils/supabase-client';
import SquareBlock from '../../components/ui/SquareBlock';
import PrettyBlock from '../../components/ui/PrettyBlock';

const limit = 10

const MyFlowsPage = () => {

    const {user} = useUser()
    const {makeToast} = useToast()
    const router = useRouter()
    const [authorFlows, setAuthorFlows] = useState([]);
    const [flowItemsWithTools, setFlowItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const map = new Map();

    async function returnAuthorFlows(user_id){
      if (user_id){
      const authorFlowsResponse = await getFlowsByAuthor(user_id);
      setAuthorFlows(authorFlowsResponse);
    }}

    async function returnFlowItems(){
      const flowItemsResponse = await getAllFlowItemsWithTools();
      setFlowItems(flowItemsResponse);
    }

    useEffect(() => {
      if(user){
      returnAuthorFlows(user.id);
    }}, [user])

    useEffect(() => {
      returnFlowItems();
    }, [])
  
    let sortedItemArray = authorFlows.slice(0,4);
    const listFlows = sortedItemArray.map(flow => {
      const currentFlowItems = flowItemsWithTools.filter(flowItem => flowItem.flow == flow.id);
      const allToolTitles = [...new Set(currentFlowItems.map(item => item.job_tool.tool.tool))];
      const allToolImages = [...new Set(currentFlowItems.map(item => item.job_tool.tool.logo_url))];
      return (
        <PrettyBlock key={flow.id} smallImage={allToolImages[0] ? allToolImages[0] : null}
      blockLink={'/flow/' + flow.id} blockBody={flow.flow}
      flexibleHeight={true} fullWidth={true}
      blockDescription={`Using ${allToolTitles.toString().split(',').join(', ')}`} />
      )
     }
    );
     


    return (
    <>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'My Guides'} 
    titleDescription={'Welcome to your guides section'} />
    </div>
    <div className="flex justify-center">
    <div className="w-full flex flex-col items-end mb-24 mt-20 md:mt-12">
    <Sidebar page="myflows" />
    <div className="mr-4 px-4 md:px-24 lg:px-48">
    <Link href="/new-flow">
    <a className="py-2 px-4 border border-black hover:bg-gray-50 rounded font-semibold">
                        + New Guide
    </a>
    </Link>
    </div>
    <div className="flex flex-col mx-auto px-4 w-full md:w-3/4 md:px-24 lg:px-48 mt-6 justify-start mb-24">
    {listFlows}
    </div>
    </div>
    </div>
    </>
    )
}

export default MyFlowsPage
