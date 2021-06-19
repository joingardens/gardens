import Pricing from '@/components/Pricing';
import LightHeroD from '@/components/ui/Hero';
import ParagraphWithButton from '@/components/ui/ParagraphWithButton';
import ListItem from '@/components/ui/ListItem';
import TextList from '@/components/ui/TextList';
import ListItemMirrored from '@/components/ui/ListItemMirrored';
import { getActiveProductsWithPrices, getAllTools } from '@/utils/supabase-client';
//import MyDisclosure from '@/components/dynamic/disclosure';
import SquareBlock from '@/components/ui/SquareBlock';
import Link from 'next/link';


export default function Index({ products, tools }) {
  
  const uniqueCategories = [...new Set(tools.map(tool => tool.category))]; 
  const toolsByCategory = [...new Set(uniqueCategories.map(category => {
  	return {
  		category: category, 
  		itemArray: tools.filter(item => {
  		if (item.category == category){
  			return item
  		} 
  	})} 
  }))];

  	const listTools = uniqueCategories.map((category) => {
  	const filteredArray = toolsByCategory.filter(item => {
    	if (item.category == category){
    		return item
    	}
    });
    const itemArray = filteredArray[0].itemArray;
  	const sortedItemArray = itemArray.sort((a, b) => a.model - b.model)
 	const itemElements = sortedItemArray.map(item => 
    <SquareBlock key={item.id} blockBody={item.tool} blockLink={item.link} linkTitle='Learn more'
    blockType={(item.model == 1) ? 'Open' : (item.model == 2) ? 'Fair' : (item.model == 4) ? 'Closed' : (item.model == 3) ? 'Exportable' : null} />
    )

    return (
    <ListItem key={category.toString()} categoryName={category.toString()} emoji={'🔨'} categoryDescription={''}>
    {itemElements}
    </ListItem>)
  }
  	);

  return (
  	<>
    <LightHeroD heading="Tools, resources, & a platform for work" 
    subheading="Delegate any kinds of tasks to people who know the process — or learn how to do things effectively."
    button_title="" button_comment=""
    button_title_1="EXPLORE" button_body_1="Our wiki"
    button_title_2="VISIT" button_body_2="The Task Shop" imagesrc="https://source.unsplash.com/collection/3106209/700x600" />
    <div className="h-12" />
    <div className="flex space-between">
    </div>
  	{/*<ParagraphWithButton />
  	<Pricing products={products} />*/}
    </>
    )
}

export async function getStaticProps() {
  const products = await getActiveProductsWithPrices();
  const tools = await getAllTools();

  return {
    props: {
      products,
      tools
    },
    revalidate: 60
  };
}
