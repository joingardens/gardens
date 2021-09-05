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
  let categoriesWithSections = uniqueSections.map(section => ({section: section, categories: []})); 
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
      if (category){

      return (
      <PrettyBlock key={urlify(category)} 
      blockBody={category} blockLink={'#' + urlify(category)} linkTitle={'View'}
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
     let includesJobs = toolsWithJobs.includes(item.id);
     return (<SquareBlock key={item.id} blockBody={item.tool} 
       smallImage={item.logo_url} smallImageAlt={item.tool + ' logo'}
       blockLink={includesJobs ? null : item.link}
       blockLinkTitle={includesJobs ? null : 'Press to open website'}
       ctaLink={includesJobs ? ('/tool/' + item.id) : null}
       ctaLinkTitle={includesJobs ? ('Press to use ' + item.tool + '!') : null}
       blockDescription={item.description}
       blockType={(item.model == 1) ? 'Open' : (item.model == 2) ? 'Fair' : (item.model == 4) ? 'Closed' : (item.model == 3) ? 'Exportable' : null} />
    ) 
   });

    if (category){
      return (
    <ListItem key={category.toString()} 
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
    colorBg={getRandomGradient()} />
    </div>
    <div className="flex pt-8 md:px-4 mt-8 overflow-x-auto">
    <SectionsAndCategories sections={categoriesWithSections} />
    </div>
    <div className="w-full">
    <h2 className="sm:text-3xl text-2xl text-center font-semibold mt-24 text-gray-900">Tools by group</h2>
    </div>
    <div className="flex space-between">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:block">
    <div className="pt-20 h-full">
    <TextList items={uniqueCategories} />
    </div>
    </aside>
    <div className="flex-col w-full w-4/5 mt-4">
    {listTools}
    </div>
    </div>
  	{/*<ParagraphWithButton />
  	<Pricing products={products} />*/}
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
