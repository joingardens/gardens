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
import { getAllFlows, getAllFlowItems, getAllFlowItemsWithTools, getAllActions } from '../../utils/supabase-client';
import SquareBlock from '../../components/ui/SquareBlock';
import PrettyBlock from '../../components/ui/PrettyBlock';

const limit = 10

const MyFlowsPage = ({ flows, flowItemsWithTools }) => {
    const {user} = useUser()
    const {makeToast} = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    let groupArray = []
  //const uniqueGroups = [...new Set(flows.map(flow => flow.job_group))];

  const uniqueGroups = [];
  const map = new Map();
  for (const flow of flows){
    if(flow.job_group){
    if(!map.has(flow.job_group.id)){
      map.set(flow.job_group.id, true);
      uniqueGroups.push({
        id: flow.job_group.id,
        job_group: flow.job_group.job_group
      });
    }}
  };
  
  const listFlows = uniqueGroups.map((group) => {
    let sortedItemArray = [];
    if (group){
     sortedItemArray = flows.filter(item => {
      if ((item.job_group && (item.job_group.id == group.id))){
        return item
      }
    });
    } else {
      sortedItemArray = flows.filter(item => !item.job_group)
    }
      
      const itemElements = sortedItemArray.map(flow => {
      const currentFlowItems = flowItemsWithTools.filter(flowItem => flowItem.flow == flow.id);
      const allToolTitles = [...new Set(currentFlowItems.map(item => item.job_tool.tool.tool))];
      const allToolImages = [...new Set(currentFlowItems.map(item => item.job_tool.tool.logo_url))];
      return (
        <PrettyBlock key={flow.id} smallImage={allToolImages[0] ? allToolImages[0] : null}
      blockLink={'/flow/' + flow.id} blockBody={flow.flow}
      flexibleHeight={true} fullWidth={true}
      blockDescription={`Using ${allToolTitles.toString().split(',').join(', ')}`}
      blockSubtitle={`By ${flow.user_public_profile ? (flow.user_public_profile.full_name) : null}`} />
      )
     }
    );
      let currentGroupTitle = group ? group.job_group : 'General';
      groupArray.push(currentGroupTitle);
    return (
    <ListItem key={currentGroupTitle.toString()} categoryName={currentGroupTitle.toString()} emoji={group ? group.emoji : '📂'} categoryDescription={''}>
    {itemElements}
    </ListItem>)
    }
    );


    return (
    <>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'My Guides'} 
    titleDescription={'Welcome to your guides section'} />
    </div>
    <div className="flex justify-center">
    <Sidebar page="myflows" />
    <div className="px-5 w-full mb-24 mt-12 md:mt-8">
    <div className="flex flex-wrap px-5 w-full justify-start mb-24">
    {listFlows}
    </div>
    </div>
    </div>
    </>
    )
}

export default MyFlowsPage

export async function getStaticProps() { 
  const flows = await getAllFlows();
  const flowItemsWithTools = await getAllFlowItemsWithTools();

  return {
    props: {
      flows,
      flowItemsWithTools
    },
    revalidate: 60
  };
}