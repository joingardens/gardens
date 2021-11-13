import LightHeroD from '../components/ui/Hero';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import ListItemMirrored from '../components/ui/ListItemMirrored';
import Title from '../components/ui/Title';
import { getAllFlows, getAllFlowItems, getAllFlowItemsWithTools, getAllActions } from '../utils/supabase-client';
import SquareBlock from '../components/ui/SquareBlock';
import getRandomGradient from '../utils/getRandomGradient';
import PrettyBlock from '../components/ui/PrettyBlock';

export default function Flows({ flows, flowItemsWithTools }) {

  let groupArray = []
  const uniqueGroups = [...new Set(flows.map(flow => flow.job_group))];
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
    <Title titleTitle={'Guides'} 
    titleDescription={'All guides, sorted by category'} />
    </div>
    <div className="flex justify-center">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:block">
    <div className="pt-20 h-full">
    <TextList items={groupArray} />
    </div>
    </aside>
    <div className="flex flex-wrap px-5 w-full justify-start mb-24">
    {listFlows}
    </div>
    </div>
    {/*<ParagraphWithButton />
    <Pricing products={products} />*/}
    </>
    )
}

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