import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import validateEmail from '../../../utils/regex/validateEmailRegex';
import { supabase } from '../../../utils/supabase-client';
import { useUser } from '../../../utils/use-user';
import GitHub from '../../icons/GitHub';
//import { useModal } from '../../../utils/use-modal';
import { searchForTools } from '../../../utils/supabase-client';
import SquareBlock from '../SquareBlock';


const EntityLookup = (props) => {

  //const { isOpen: show, close } = useModal('entityModal');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentItems, setcurrentItems] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {

      const returnSearchResult = async (searchTerm) => {
        if (searchTerm != ''){
      const searchResultItems = await searchForTools(searchTerm); // wait for this data to load
      setcurrentItems(searchResultItems);
    }
     
  }
  returnSearchResult(searchTerm);
      
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
               
                <button
                  type="button"
                  onClick={() => {
                    setcurrentItems([]);
                    setSearchTerm('');
                  }
                  }
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 dark:text-white text-base font-medium text-gray-700 hover:bg-gray-50 focus-ring sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  aria-label="cancel"
                >
                  Cancel
                </button>
                      <input className="appearance-none w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline" 
                      autoFocus type='text' autoComplete='off'
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                      id="searchbox" placeholder="Start typing..."/>
              </div>
              <div className="w-full">
                {(currentItems && (currentItems.length > 0)) ? currentItems.map(item => (
                  
                  <div key={item.id}>
                  <button  className="w-full" onClick={() => props.setSelectedItems([item.tool])
                  }><div className="pl-4 py-2 text-lg text-left border-l border-r border-b w-full h-12">
                    {item.tool}
                  </div></button>
                  </div>                
/*
                  <SquareBlock key={item.id} blockBody={item.tool} 
       smallImage={item.logo_url} smallImageAlt={item.tool + ' logo'}
       ctaLink={('/tool/' + item.id)}
       ctaLinkTitle={('Learn more')}
       blockDescription={item.category}
       blockType={(item.model == 1) ? 'Open' : (item.model == 2) ? 'Fair' : (item.model == 4) ? 'Closed' : (item.model == 3) ? 'Exportable' : null} />*/
       )) : null}
                {(currentItems.length == 0) ? (<div className="py-2">
             <span className="font-bold text-gray-400">
              Nothing in here... Search for something else?
              </span>
             </div>) : null}
              </div>
              </>
  );
};

export default EntityLookup;