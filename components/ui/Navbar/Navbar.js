import Link from 'next/link';
//import s from './Navbar.module.css';
import React, { useState, useEffect } from 'react';
import { signInWithKeycloak } from '../../../utils/supabase-client';
import Logo from '../../icons/Logo';
import { useUser } from '../../../utils/useUser';
import SearchBar from '../SearchBar/SearchBar';
//import { ModalProvider } from '../../../utils/use-modal';
import { useContext } from 'react';
import ModalsContext from '../../modals/modalsContext';
import useToast from '../../hooks/useToast';

const Navbar = () => {
  const { user, signOut, subscription } = useUser();
  const {service} = useContext(ModalsContext);

  let listener = null;
  const [scrollState, setScrollState] = useState("bg-gray-50 border")
  const [buttonState, setButtonState] = useState("bg-white text-gray-900 hover:bg-gray-200 border border-gray-400")
  const [titleState, setTitleState] = useState("text-gray-900 font-semibold")
  const [ctaState, setCtaState] = useState("bg-green-500 text-white hover:bg-green-600 transition")
  const {makeToast} = useToast()

  useEffect(() => {
    listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 10) {
        if (scrollState !== "bg-white bg-opacity-80") {
          setScrollState("bg-white bg-opacity-80")
        }
      } else {
        if (scrollState !== "bg-gray-50 border") {
          setScrollState("bg-gray-50 border")
        }
      }
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrollState])

  return (
    <>
      <div className={`sticky top-0 ${scrollState} z-40 transition mx-auto flex flex-wrap px-2 py-2 flex-col md:flex-row items-center`}>
        <nav className="w-full flex flex-wrap items-center text-base justify-between">
        <div className="flex items-center justify-center md:ml-4">
        <Link href="/">
              <a className="title-font font-medium text-gray-900 rounded" aria-label="Logo">
              <div className="flex items-center ml-0 md:ml-2">
              <Logo className="w-5 h-5 sm:w-9 sm:h-9 rounded-full bg-white shadow-md" />
              <span className={`px-2 md:px-4 py-1 text-md sm:text-xl ${titleState}`}>Gardens</span>
              </div>
              </a>
              </Link>
        </div>
        <div className="flex items-center justify-center">
            <button 
            onClick={() => {
              service.openModal("search")
            }}
            className={`inline-flex items-center ${buttonState} py-1 px-1 mr-1.5 md:mr-2.5  focus:outline-none rounded-full text-base`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg>
            </button>
              <Link href="/flows">
                <a className={`mr-1.5 md:mr-2.5 ${buttonState} py-1 px-2 focus:outline-none rounded hidden md:block`}>Guides</a>
              </Link>
              <Link href="/tools">
                <a className={`hidden sm:block mr-1.5 md:mr-2.5 ${buttonState} py-1 px-2 focus:outline-none rounded`}>Tools</a>
              </Link>
              {(user && subscription) ? (<Link href={"/myapps"}>
                <a className={`mr-1.5 md:mr-2.5 ${ctaState} py-1 px-2 focus:outline-none rounded font-semibold`}>
                  My apps
                </a>
              </Link>) : (user ? (<Link href={"/onboarding/"}>
                <a className={`mr-1.5 md:mr-2.5 ${ctaState} py-1 px-2 focus:outline-none rounded font-semibold`}>
                  Finish registration
                </a>
              <Link href={"/apps"}>
                <a className={`mr-1.5 md:mr-2.5 ${ctaState} py-1 px-2 focus:outline-none rounded font-semibold`}>
                  Start self-hosting
                </a>
              </Link>)
              
              }
              {/*user ? (
            <>
            <button 
            onClick={() => {
              service.openModal("newItem")
            }}
            className={`inline-flex items-center ${ctaState} py-1 px-2 mr-1.5 md:mr-2.5  focus:outline-none rounded font-bold`}>
            + New
            </button>
              <Link href="#">
                <a className={`text-gray-600 absolute top-0 right-0 mt-20 mr-4 bg-white rounded px-0.5 border border-gray-300 hover:bg-gray-100`} onClick={() => signOut()}>
                  Sign out
                </a>
              </Link>
               </>
            ) : (
            null
            )*/}
              {/*
              <Link href="/account">
                <a className="mr-2.5 bg-white py-1 px-2 focus:outline-none hover:bg-gray-200 rounded text-base">Account</a>
              </Link>
            */}
            </div>
        </nav>
      </div>
      </>
  );
};

export default Navbar;
