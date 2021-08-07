import { supabase } from '../../../utils/supabase-client';
import React, { useRef, useState, useEffect } from 'react';

import { useModal } from '../../../utils/use-modal';
import EntityModal from '../EntityModal/EntityModal';


const EntitySearch = (props): JSX.Element => {

  const { open, isOpen } = useModal({ EntityModal: EntityModal });

  return (

  
        <>
        <button onClick={() => open('EntityModal')} className="inline-flex items-center bg-white py-1 px-2 ml-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-2 md:mt-0">
        {props.placeholder}
        </button>
        </>
      
      )

};

export default EntitySearch;