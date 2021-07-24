import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import validateEmail from '../../../utils/regex/validateEmailRegex';
import { supabase } from '../../../utils/supabase-client';
import { useUser } from '../../../utils/use-user';
import GitHub from '../../icons/GitHub';
import { useModal } from '../../../utils/use-modal';
import { searchForTools, searchForJobs } from '../../../utils/supabase-client';
import SquareBlock from '../SquareBlock';


const SearchModal = () => {

  const { isOpen: show, close } = useModal('searchModal');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTools, setcurrentTools] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {

      const returnSearchResult = async (searchTerm) => {
      const searchResultTools = await searchForTools(searchTerm); // wait for this data to load
      const searchResultJobs = await searchForJobs(searchTerm);
      setcurrentTools(searchResultTools);
      setCurrentJobs(searchResultJobs);
      console.log(searchResultTools)
      console.log(searchResultJobs)
     
  }
  returnSearchResult(searchTerm);
      
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <Transition show={show}>
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex relative items-end justify-center min-h-screen pt-4 px-4 pb-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="absolute inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => close('searchModal')}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-50" />
            </div>
          </Transition.Child>
         

          <div
            className="w-full bg-white dark:bg-gray-800 inline-block rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {/* <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus-ring sm:ml-3 sm:w-auto sm:text-sm">
                Sign in
                    </button> */}
                <button
                  type="button"
                  onClick={() => close('searchModal')}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 dark:text-white text-base font-medium text-gray-700 hover:bg-gray-50 focus-ring sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  aria-label="cancel"
                >
                  Cancel
                </button>
                      <input className="appearance-none w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline" 
                      autoFocus type='text' autoComplete='off'
                      onChange={(e) => setSearchTerm(e.target.value)}
                      id="searchbox" placeholder="Enter your search term here..."/>
              </div>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                {(currentJobs && (currentJobs.length > 0)) ? currentJobs.map(item => (
                  <SquareBlock key={item.id} blockBody={item.job} 
       ctaLink={('/job/' + item.id)}
       ctaLinkTitle={('Learn more')}
       blockDescription={item.job_group.job_group}/>
       )) : null}
                {(currentJobs && (currentJobs.length > 0)) ? (<div className="h-0.5 mx-auto my-6 w-3/5 bg-gray-200"></div>) : null}
                {(currentTools && (currentTools.length > 0)) ? currentTools.map(item => (
                  <SquareBlock key={item.id} blockBody={item.tool} 
       smallImage={item.logo_url} smallImageAlt={item.tool + ' logo'}
       ctaLink={('/tool/' + item.id)}
       ctaLinkTitle={('Learn more')}
       blockDescription={item.category}
       blockType={(item.model == 1) ? 'Open' : (item.model == 2) ? 'Fair' : (item.model == 4) ? 'Closed' : (item.model == 3) ? 'Exportable' : null} />
       )) : null}
                {((currentTools.length == 0) && (currentJobs.length == 0)) ? (<div className="py-2">
             <span className="font-bold text-gray-400">
              Nothing in here... Search for something else?
              </span>
             </div>) : null}
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default SearchModal;