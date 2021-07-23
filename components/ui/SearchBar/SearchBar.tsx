import { supabase } from '../../../utils/supabase-client';
import React, { useRef, useState, useEffect } from 'react';

import { useModal } from '../../../utils/use-modal';
import SearchModal from '../SearchModal/SearchModal';


const SearchBar = (): JSX.Element => {

  // Search component courtesy Nick Coughlin https://github.com/ncoughlin/react-widgets/blob/master/src/components/Search.js

  /*const [content, setContent] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);*/
  const { open, isOpen } = useModal({ searchModal: SearchModal });

  return (

  
        <>
        <button onClick={() => open('searchModal')} className="inline-flex items-center bg-white py-1 px-2 ml-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-2 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg>
        </button>
        </>
      
      )

};

export default SearchBar;