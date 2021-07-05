import Pricing from '../components/Pricing';
import LightHeroD from '../components/ui/Hero';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import ListItemMirrored from '../components/ui/ListItemMirrored';
import Title from '../components/ui/Title';
import { getAllValues } from '../utils/supabase-client';
import PrettyBlock from '../components/ui/PrettyBlock';
import getRandomGradient from '../utils/getRandomGradient';

export default function ValuePage({ values }) {
  
  
  	const listValues = values
 	  const itemElements = listValues.map(item => {

       return (
         <PrettyBlock key={item.id} 
         fullWidth={true} flexibleHeight={true}
      blockBody={item.value} blockDescription={item.description}
    blockType={''} />
     )})


  return (
  	<>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'Values'} 
    titleDescription={'There can be no innovation without values. Here are some of ours:'} 
    colorBg={'white'} />
    </div>
    <div className="flex-col md:w-3/5 w-5/6 mx-auto my-24">
    {itemElements}
    </div>
    </>
    )
}

export async function getStaticProps() {
  const values = await getAllValues();

  return {
    props: {
      values
    },
    revalidate: 60
  };
}
