import React from "react";
import PropTypes from  "prop-types";
import Logo from '../../icons/Logo';
import FacebookIcon from "../../icons/Facebook";
import InstagramIcon from "../../icons/Instagram";
import TwitterIcon from "../../icons/Twitter";
import PinterestIcon from "../../icons/Pinterest";
import TikTokIcon from "../../icons/TikTok";
import Link from 'next/link';
import { useUser } from '../../../utils/useUser';
import { useContext } from 'react';
import ModalsContext from '../../modals/modalsContext';


function LightFooterA(props) {
    const {service} = useContext(ModalsContext);
    const { user, signOut } = useUser();
    const linkCta = (user ? '/myapps' : '/apps');


  return (
    <footer className="text-gray-600 body-font">

      <div className="w-full px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col bg-gray-50 shadow-inner">
        <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-48 flex-shrink-0 md:mx-0 mx-auto">
          <a href="" className="w-full h-full title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <div className="flex items-center justify-center w-full pr-4">
            <Logo className="w-12 h-12" />
            <span className="ml-3 md:text-xl text-lg font-semibold">Gardens</span>
            </div>
            </a>
        </div>
        <div className="flex flex-col items-center justify-center md:py-5">
          <p className="text-sm text-gray-500 ml-2 md:ml-6">
           Grow your garden.
          </p>
          </div>
          </div>
          <p className="text-sm text-center text-gray-500 my-2">
           By continuing to use the site you agree to our <Link href="/privacy"><a className="font-bold underline">Privacy Policy</a></Link>
          </p>
          <div className="flex items=center justify-between mx-auto my-3 md:my-2 w-48">
          <a href="https://twitter.com/joingardens" target="_blank">
          <TwitterIcon/>
          </a>
          <a href="https://www.instagram.com/joingardens/" target="_blank">
          <InstagramIcon/>
          </a>
          <a href="https://pin.it/6Im3O5a" target="_blank">
          <PinterestIcon/>
          </a>
          <a href="https://www.facebook.com/joingardens/" target="_blank">
          <FacebookIcon/>
          </a>
          <a href="https://www.tiktok.com/@joingardens?" target="_blank">
          <TikTokIcon/>
          </a>
          </div>
         </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {user ? (
            <div className="lg:w-1/4 md:w-1/2 w-full px-4 md:mt-2 mb-12">
            <Link href="/">
                <a className={`text-gray-600 bg-white rounded px-8 font-semibold py-2 border border-gray-600 hover:bg-gray-100`} onClick={() => signOut()}>
                  Sign out
                </a>
              </Link>
          </div>
          ) : null}
          
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h3 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              DISCOVER
            </h3>
            <nav className="flex flex-col mb-10">
              {/*user ? (
                <Link href="/drafts">
                <a className="text-gray-600 hover:text-gray-800 font-medium" >
                  Drafts
                </a>
              </Link>
              ) : null*/}
              <Link href="/flows">
                <a className="text-gray-600 hover:text-gray-800 font-medium" >
                  Guides
                </a>
              </Link>
              <Link href="/tools">
                <a className="text-gray-600 hover:text-gray-800 font-medium" >
                  Tools
                </a>
              </Link>
              <Link href="/listings">
                <a className="text-gray-600 hover:text-gray-800 font-medium" >
                  Listings
                </a>
              </Link>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h3 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CONTRIBUTE
            </h3>
            <nav className="flex flex-col mb-10">
              <Link href={`${linkCta}`}>
                <a className="text-gray-600 hover:text-gray-800 font-medium" >
                  Self-host
                </a>
              </Link>
              
             {/*
             <Link href="/signin">
                <a className="text-gray-600 hover:text-gray-800 font-medium" >
                  Other ways to help
                </a>
              </Link>
             */}
             <a className="text-gray-600 hover:text-gray-800 font-medium" href="https://masto.cloud.joingardens.com/public" target="_blank">
                  Join the community
                </a>
                <a className="text-gray-600 hover:text-gray-800 font-medium" href="https://tally.so/r/wMOjXm" target="_blank">
                  For organizations
                </a>
                <a className="text-gray-600 hover:text-gray-800 font-medium" href="https://github.com/joingardens/gardens/" target="_blank">
                  Open-Source
                </a>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h3 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CONTACT US
            </h3>
            <nav className="flex flex-col mb-10">
                <a href="mailto:hello@joingardens.com" target="_blank" className="text-gray-600 hover:text-gray-800 font-medium" >
                  hello@joingardens.com
                </a>
              <a href="https://cal.com/gardens/intro" target="_blank" className="text-gray-600 hover:text-gray-800 font-medium" >
                Book a call
                </a>
                <div className="my-2 mx-auto md:mx-0 w-12 bg-gray-200 h-0.5" />
              <Link href="/privacy">
              Privacy Policy</Link>
              <Link href="/terms">
              Terms</Link>
            </nav>
          </div>
        </div>
      </div>
      {/*<div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2020 Tailblocks —
            <a href=""="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">
              @knyttneve
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a href="" className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="" className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="" className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>
            <a href="" className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                 />
                <circle cx="4" cy="4" r="2" stroke="none" />
              </svg>
            </a>
          </span>
        </div>
  </div>*/}
    </footer>
  );
}

LightFooterA.defaultProps = {
  theme: 'blue'
};

LightFooterA.propTypes = {
  theme: PropTypes.string.isRequired
};

export default LightFooterA;
