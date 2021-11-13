import Link from 'next/link';
//import s from './Navbar.module.css';
import React, { useState, useEffect } from 'react';
import Logo from '../../icons/Logo';
import { useUser } from '../../../utils/useUser';
import SearchBar from '../SearchBar/SearchBar';
//import { ModalProvider } from '../../../utils/use-modal';
import { useContext } from 'react';
import ModalsContext from '../../modals/modalsContext';
import useToast from '../../hooks/useToast';

const Navbar = () => {
  const { user, signOut } = useUser();
  const {service} = useContext(ModalsContext);
  const linkCta = (user ? '/new-flow' : '/signin');

  let listener = null;
  const [scrollState, setScrollState] = useState("bg-seaweed")
  const [buttonState, setButtonState] = useState("bg-seaweed text-white hover:bg-white hover:text-gray-900")
  const [titleState, setTitleState] = useState("text-white font-bold")
  const [ctaState, setCtaState] = useState("bg-white text-gray-900 hover:bg-gray-200 border border-gray-400")
  const {makeToast} = useToast()

  useEffect(() => {
    listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 10) {
        if (scrollState !== "bg-white bg-opacity-80 border") {
          setScrollState("bg-white bg-opacity-80 border")
          setCtaState("bg-seaweed text-white hover:bg-white hover:text-gray-900 transition")
          setButtonState("bg-white text-gray-900 hover:bg-gray-200 border border-gray-400")
          setTitleState("text-gray-900 font-semibold")
        }
      } else {
        if (scrollState !== "bg-seaweed") {
          setScrollState("bg-seaweed")
          setCtaState("bg-white text-gray-900 hover:bg-gray-200 border border-gray-400")
          setButtonState("bg-seaweed text-white hover:bg-white hover:text-gray-900 transition")
          setTitleState("text-white font-bold")
        }
      }
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrollState])

  return (
    <>
      <div className={`sticky top-0 ${scrollState} z-40 transition-all mx-auto flex flex-wrap px-2 py-2 flex-col md:flex-row items-center`}>
        <nav className="w-full flex flex-wrap items-center text-base justify-between">
        <div className="flex items-center justify-center">
        <Link href="/">
              <a className="title-font font-medium text-gray-900 rounded" aria-label="Logo">
              <div className="flex items-center">
              <Logo className="w-12 h-12 bg-white rounded-full border border-gray-400" />
              <span className={`px-3 text-md sm:text-xl ${titleState}`}>Gardens</span>
              </div>
              </a>
              </Link>
        </div>
        <div className="flex items-center justify-center">
              
              <Link href="/flows">
                <a className={`mr-2.5 ${buttonState} py-1 px-2 focus:outline-none rounded`}>Guides</a>
              </Link>
              <Link href="/tools">
                <a className={`hidden sm:block mr-2.5 ${buttonState} py-1 px-2 focus:outline-none rounded`}>Tools</a>
              </Link>
              {/*
              <Link href="/account">
                <a className="mr-2.5 bg-white py-1 px-2 focus:outline-none hover:bg-gray-200 rounded text-base">Account</a>
              </Link>*/}
              {user ? (
              <Link href="#">
                <a className={`mr-2.5 ${buttonState} py-1 px-2 focus:outline-none rounded`} onClick={() => signOut()}>
                  Sign out
                </a>
              </Link>
               
            ) : (
              
              null
            )}
            <Link href={`${linkCta}`}>
                <a className={`mr-2.5 ${ctaState} py-1 px-2 focus:outline-none rounded`} onClick={() => signOut()}>
                  + Add a guide
                </a>
              </Link>
            <button 
            onClick={() => {
              service.openModal("search")
            }}
            className={`mr-2.5 ${ctaState} py-1 px-2 focus:outline-none rounded`}>
              Open search
            </button>
        </div>
        </nav>
      </div>
      </>
  );
};

export default Navbar;
