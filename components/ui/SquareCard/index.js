import React from "react";
import PropTypes from  "prop-types";
import Image from 'next/image';
// import getRandomGradient from '../../../utils/getRandomGradient'

function SquareCard(props) {

  return (
    <>
    <div className={`my-4 ml-12 md:ml-16 flex h-40 w-40`}>
    <a href={props.blockLink} className={'w-full items-center text-center'}>
        <div className={`shadow bg-white hover:bg-gray-100 transition rounded h-full w-full items-center justify-center flex `}>
          <div className="flex items-center w-full h-full py-2 bg-opacity-50 text-ce">
          <div className="flex flex-col px-2 items-center w-full">
          {props.smallImage ? (
            <div className="w-16 h-16 relative">
            <a href={props.ctaLink ? props.ctaLink : props.blockLink} target="_blank">
            <Image src={props.smallImage} alt={props.smallImageAlt} 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </a>
            </div>) : null}
          <span className="text-lg text-center mt-4 font-semibold text-gray-700">{props.blockBody}</span>
          {props.blockDescription ? (
            <span className="py-1 font-semibold text-left text-gray-500 text-sm">{props.blockDescription} <a href={props.blockDescriptionLinkHref}>
            {props.blockDescriptionLinkTitle ? (<span className="font-semibold underline">{props.blockDescriptionLinkTitle}</span>) : (null)}
            </a>
            </span>
            ) : (null)}  
            {props.blockSubtitle ? (<span className="text-gray-900 text-left font-normal">{props.blockSubtitle}</span>) : null}
            </div>
          </div>
        </div>
        </a>
      </div>
      </>
  );
}

export default SquareCard;
  
