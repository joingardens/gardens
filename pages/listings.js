import Pricing from '../components/Pricing';
import LightHeroD from '../components/ui/Hero';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import ListItemMirrored from '../components/ui/ListItemMirrored';
import Title from '../components/ui/Title';
import { getPublishedListings } from '../utils/supabase-client';
import SquareBlock from '../components/ui/SquareBlock';
import getRandomGradient from '../utils/getRandomGradient';

export default function UseCasePage({ listings }) {
  
  let groupArray = []
  const uniqueGroups = [...new Set(listings.map(listing => listing.listing_type))]; 
  const listingsByGroup = [...new Set(uniqueGroups.map(group => {
  	return {
  		category: group ? group : 'Default', 
  		itemArray: listings.filter(item => {
  		if (item.listing_type == group){
  			return item
  		} 
  	})} 
  }))];

  	const listListings = uniqueGroups.map((group) => {
  	const sortedItemArray = listingsByGroup.find(item => item.category == group)
 	  const itemElements = sortedItemArray ? sortedItemArray.itemArray.map(item => {
      
      return (
    <SquareBlock key={item.id} blockId={item.id} blockBody={item.listing}
    blockDescription={item.description} 
    ctaLink={item.url}
    ctaLinkTitle={'Open'}
    blockType={null} />
    )}) : null 

    let currentGroupTitle = group ? group : 'Default';


    if (currentGroupTitle != 'Default' && currentGroupTitle){
      groupArray.push(currentGroupTitle);
      
      return (
    <ListItem key={currentGroupTitle.toString()} 
    categoryName={currentGroupTitle.toString()} emoji={'🌐'} 
    categoryDescription={''}>
    {itemElements}
    </ListItem>)
    }

    
  }
  	);

  return (
  	<>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'Listings'}
    titleDescription={'Collections with useful information around the Web'} 
    colorBg={getRandomGradient()} />
    </div>
    <div className="flex space-between">
    <aside className="h-screen sticky top-0 w-1/5 hidden md:flex">
    <div className="pt-20 h-full">
    <TextList items={groupArray} />
    </div>
    </aside>
    <div className="flex-col w-full w-4/5 mt-14">
    {listListings}
    </div>
    </div>
  	{/*<ParagraphWithButton />
  	<Pricing products={products} />*/}
    </>
    )
}

export async function getStaticProps() {
  const listings = await getPublishedListings();

  return {
    props: {
      listings
    },
    revalidate: 60
  };
}
