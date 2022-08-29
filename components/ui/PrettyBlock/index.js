import React from "react";
import getRandomGradient from '../../../utils/getRandomGradient'
import Image from 'next/image';

function PrettyBlock(props) {

  const blockColor = getRandomGradient();
  const typeColor = (props.blockType == 'Open') ? 'text-primary' : (props.blockType == 'Fair') ? 'text-primary' : (props.blockType == 'Closed') ? 'text-primary' : 'text-primary';
  const blockWidth = props.fullWidth ? 'w-full' : 'w-48 md:w-64';
  const blockHeight = props.flexibleHeight ? '' : 'h-24';

  // Shorten a string to less than maxLen characters without truncating words. Courtesy Chris Cinelli https://stackoverflow.com/a/40382963
  function shorten(str, maxLen, separator = ' ') {
  if (str.length <= maxLen) return str;
  return (str.substr(0, str.lastIndexOf(separator, maxLen)) + '...');
  }

  let shortBlockBody = shorten(props.blockBody, 42);

  return (
    <>
    <div className={`my-4 ml-2 flex ${blockHeight} w-full md:w-auto`}>
    <a href={props.blockLink} className={'font-semibold w-full items-center text-center mr-4'}>
        <div className={`shadow border hover:bg-gray-100 transition rounded h-full w-full md:${blockWidth} items-center justify-center flex `}>
          <div className="flex items-center bg-gray-100 w-full h-full py-2 bg-opacity-50 text-ce">
          {/*<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>*/}
          <div className="flex flex-col px-2 w-full">
          <span className="title-font text-gray-700 text-md text-left">{shortBlockBody}</span>
          {props.blockDescription ? (
            <span className="py-1 font-semibold text-left text-gray-500 text-sm">{props.blockDescription} <a href={props.blockDescriptionLinkHref}>
            {props.blockDescriptionLinkTitle ? (<span className="font-semibold underline">{props.blockDescriptionLinkTitle}</span>) : (null)}
            </a>
            </span>
            ) : (null)}  
            {props.blockSubtitle ? (<span className="text-gray-900 text-left font-normal">{props.blockSubtitle}</span>) : null}
            </div>
            {props.smallImage ? (
            <div className="w-20 h-20 relative mr-4">
            <a href={props.ctaLink ? props.ctaLink : props.blockLink} target="_blank">
            <Image src={props.smallImage} alt={props.smallImageAlt} 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </a>
            </div>) : null}
          </div>
        </div>
        </a>
      </div>
      </>
  );
}


export default PrettyBlock;
  
