import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import validateEmail from '../../../utils/regex/validateEmailRegex';
import { supabase } from '../../../utils/supabase-client';
import { useUser } from '../../../utils/use-user';
import GitHub from '../../icons/GitHub';
import { useModal } from '../../../utils/use-modal';

const SearchModal = () => {

  const { isOpen: show, close } = useModal('searchModal');

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
            className="w-full bg-white dark:bg-gray-800 inline-block rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm"
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
                      id="searchbox" type="text" placeholder="Enter your search term here..."/>
              </div>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                Hi there
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default SearchModal;