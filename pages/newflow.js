import React, { useState, useEffect } from 'react';
import Pricing from '../components/Pricing';
import LightHeroD from '../components/ui/Hero';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import ListItem from '../components/ui/ListItem';
import TextList from '../components/ui/TextList';
import Title from '../components/ui/Title';
import EntityLookup from '../components/ui/EntityLookup/EntityLookup';
import getRandomGradient from '../utils/getRandomGradient';
//import { ModalProvider } from '../utils/use-modal';
//import { getAllValues } from '../utils/supabase-client';
//import PrettyBlock from '../components/ui/PrettyBlock';
//import { useUser } from '../../../utils/useUser';

export default function NewFlow() {

  //NewFlow({ values })
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(selectedItems)

  return (
  	<>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'Create a new flow'} 
    colorBg={'white'} />
    </div>
    <div className="flex-col md:w-3/5 w-5/6 mx-auto my-24">
    <div className="font-semibold text-gray-900">
    Start typing a task or a tool to start.
    </div>
    <div className="w-full">
    Do ... using {selectedItems ? selectedItems[0] : 'Add some tools!'}
    
    </div>
    <EntityLookup selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </div>
    </>
    )
}