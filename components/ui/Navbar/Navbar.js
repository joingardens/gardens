import Link from 'next/link';
//import s from './Navbar.module.css';
import React, { useState, useEffect } from 'react';
import Logo from '../../icons/Logo';
import { useUser } from '../../../utils/useUser';
import SearchBar from '../SearchBar/SearchBar';
//import { ModalProvider } from '../../../utils/use-modal';
import { useContext } from 'react';
import ModalsContext from '../../modals/modalsContext';

const Navbar = () => {
  const { user, signOut } = useUser();
  const {service} = useContext(ModalsContext)

  let listener = null;
  const [scrollState, setScrollState] = useState("bg-transparent")

  useEffect(() => {
    listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 10) {
        if (scrollState !== "bg-white bg-opacity-80 border") {
          setScrollState("bg-white bg-opacity-80 border")
        }
      } else {
        if (scrollState !== "bg-transparent") {
          setScrollState("bg-transparent")
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
        <Link href="/">
              <a className="title-font font-medium items-center text-gray-900 mb-4 md:mb-0 pr-4 hidden md:flex rounded hover:shadow hover:bg-white transition" aria-label="Logo">
              <div>
              <Logo />
              </div>
              <span className="ml-3 text-xl">Open Work</span>
              </a>
              </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

              <Link href="/values">
                <a className="hidden sm:block mr-2.5 p-2 hover:bg-white hover:underline rounded transition">Values</a>
              </Link>
              <Link href="/flows">
                <a className="mr-2.5 p-2 hover:bg-white hover:underline rounded transition">Flows</a>
              </Link>
              {/*
              <Link href="/account">
                <a className="mr-5 p-2 hover:bg-white hover:underline rounded transition">Account</a>
              </Link>*/}
              {user ? (
              <Link href="#">
                <a className="mr-2.5 p-2 hover:bg-white hover:underline rounded transition" onClick={() => signOut()}>
                  Sign out
                </a>
              </Link>
            ) : (
            <div className="flex items-center">
              {/*<Link href="/signin">
                <a className="mr-5 px-2 hover:underline">Sign in</a>
              </Link>*/}
              <Link href="/">
 <button className="inline-flex items-center bg-white border border-black py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-2 md:mt-0" 
 onClick={() => {
      service.openModal("newFlow")
    }}>
      Open modal
      <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
    </button>
        </Link>
        </div>
            )}
            <SearchBar/>
        </nav>
      </div>
      </>
  );
};

export default Navbar;
