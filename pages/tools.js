import Pricing from '../components/Pricing';
import LightHeroD from '../components/ui/Hero';
import Link from 'next/link';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import ListItemMirrored from '../components/ui/ListItemMirrored';
import Title from '../components/ui/Title';
import { getActiveProductsWithPrices, getAllTools, getAllJobTools } from '../utils/supabase-client';
import urlify from '../utils/helpers.js';
import SquareBlock from '../components/ui/SquareBlock';
import PrettyBlock from '../components/ui/PrettyBlock';
import getRandomGradient from '../utils/getRandomGradient';
import SectionsAndCategories from '../components/ui/SectionsAndCategories';

export default function ToolsPage({ products, tools, jobTools }) {
  
  let toolsWithJobs = [];
  jobTools.map(jobTool => toolsWithJobs.push(jobTool.tool))
  const uniqueCategories = [...new Set(tools.map(tool => tool.category))];
  const uniqueSections = [...new Set(tools.map(tool => tool.section))];
  const sortedSections = uniqueSections.sort((a, b) => {if (a && b){
    if(a == "General"){
      return -2
    } else {
      return a.localeCompare(b)
    }
  }} );
  let categoriesWithSections = sortedSections.map(section => ({section: section, categories: []})); 
  tools.map(tool => {
    let currentSection = categoriesWithSections.findIndex(categoryWithSection => categoryWithSection.section == tool.section);
    (!categoriesWithSections[currentSection].categories.includes(tool.category)) ? categoriesWithSections[currentSection].categories.push(tool.category) : null
  });
  const toolsByCategory = [...new Set(uniqueCategories.map(category => {
  	return {
  		category: category, 
  		itemArray: tools.filter(item => {
  		if (item.category == category){
  			return item
  		} 
  	})} 
  }))];

    const featuredElements = uniqueCategories.map(category => {
      if (category && (category.length != 0)){

      return (
      <PrettyBlock key={category ? urlify(category) : ''} 
      blockBody={category} blockLink={category ? ('#' + urlify(category)) : ''} linkTitle={'View'}
    blockType={'Open'} />)
      }
    });

  	const listTools = uniqueCategories.map((category) => {
  	const filteredArray = toolsByCategory.filter(item => {
    	if (item.category == category){
    		return item
    	}
    });
    const itemArray = filteredArray[0].itemArray;
  	const sortedItemArray = itemArray.sort((a, b) => a.model - b.model)
   	
     const itemElements = sortedItemArray.map(item => 
   {
     let isOneClick = (item.one_click) ? true : false;
     return (<SquareBlock key={item.id} blockBody={item.tool} 
       smallImage={item.logo_url} smallImageAlt={item.tool + ' logo'}
       blockLink={isOneClick ? null : item.link}
       blockLinkTitle={isOneClick ? null : 'Press to open website'}
       ctaLink={isOneClick ? ('/tool/' + item.id) : null}
       ctaLinkTitle={isOneClick ? ('Press to self-host ' + item.tool + '!') : null}
       blockDescription={item.description}
       blockColor={(isOneClick && item.model == 1) ? 'Green' : ((isOneClick && item.model == 2) ? 'Blue' : null)}
       blockType={(item.model == 1) ? 'Open' : ((item.model == 2) ? 'Fair' : ((item.model == 3) ? 'Exportable' : ((item.model == 4) ? 'Closed' : null)))} />
    ) 
   });

    if (category && (category.length != 0)){
      return (
    <ListItem key={category.toString()} noUrl={true}
    categoryName={category.toString()} categoryDescription={''}
    addLink={'https://tally.so/r/w8Zo5m' + '?category=' + category.toString()}>
    {itemElements}
    </ListItem>)
    }

    
  }
  	);
    

  return (
  	<>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'Tools'} 
    titleDescription={'Open-source and fair-code tools are shown at the top. Pick a category — or keep scrolling to discover all tools.'} 
     />
    </div>
    <div className="flex space-between">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:block">
    <div className="pt-20 h-full">
    <TextList items={uniqueCategories} />
    </div>
    </aside>
    <div className="flex-col w-full w-4/5 mt-4">
    <SectionsAndCategories sections={categoriesWithSections} />
    {listTools}
    </div>
    </div>
    </>
    )
}

export async function getStaticProps() {
  const products = await getActiveProductsWithPrices();
  const tools = await getAllTools();
  const jobTools = await getAllJobTools();

  return {
    props: {
      products,
      tools,
      jobTools
    },
    revalidate: 60
  };
}
