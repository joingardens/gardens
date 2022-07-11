import React from 'react';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import LightHeroD from '../../components/ui/Hero';
import Link from 'next/link';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import ListItem from '../../components/ui/ListItem';
import TextList from '../../components/ui/TextList';
import ListItemMirrored from '../../components/ui/ListItemMirrored';
import Title from '../../components/ui/Title';
import { getActiveProductsWithPrices, getToolsBySection, getAllJobTools, getAllSections } from '../../utils/supabase-client';
import urlify from '../../utils/helpers.js';
import SquareBlock from '../../components/ui/SquareBlock';
import PrettyBlock from '../../components/ui/PrettyBlock';
import getRandomGradient from '../../utils/getRandomGradient';

export default function ToolsBySection({ products, tools, jobTools }) {
   
   const router = useRouter()
   if (router.isFallback) {
    return (<div className="py-36">
    <h1 className="text-2xl text-center">Nothing here... 
    <a href="/" className="text-blue-600 hover:underline">Go home?</a></h1>
    </div>
    )
  } else {
  
  const { section_title } = router.query
  
  let toolsWithJobs = [];
  jobTools.map(jobTool => toolsWithJobs.push(jobTool.tool))
  const uniqueCategories = [...new Set(tools.map(tool => tool.category))];
  const uniqueSections = [...new Set(tools.map(tool => tool.section))];
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

    if (category && (category.length != 0)){
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
    <Title titleTitle={section_title + ` Tools`} 
    titleDescription={`Discover our collection of ` + section_title + ` Tools. Press on a tool to view related guides or open the website. Open-source and fair-code tools are shown at the top.`} 
     />
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
}


export async function getStaticPaths() {
  const allSections = await getAllSections();
  let sectionTitles = [];
  allSections.map(section => {
    if (section){
      if(section.section){
      sectionTitles.push({params: {section_title: section.section.toString()}})
    }
    }
    
  })

  return {
    paths: sectionTitles,
    fallback: true,
  }
}


export async function getStaticProps(context) {
  const tools = await getToolsBySection(context.params.section_title);
  const products = await getActiveProductsWithPrices();
  const jobTools = await getAllJobTools();

  if (!tools) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products,
      tools,
      jobTools
    },
    revalidate: 60
  };
}