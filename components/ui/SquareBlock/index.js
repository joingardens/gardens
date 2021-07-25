import React from "react";
import Image from 'next/image'

function SquareBlock(props) {

  const blockColor = (props.blockType == 'Open') ? 'green-50' : (props.blockType == 'Fair') ? 'yellow-50' : (props.blockType == 'Exportable') ? 'gray-50' : 'gray-50';
  const typeColor = (props.blockType == 'Open') ? 'text-green-500' : (props.blockType == 'Fair') ? 'text-yellow-500' : (props.blockType == 'Closed') ? 'text-red-500' : 'text-primary'
  const fontWeight = (props.blockType == 'Open') ? 'medium' : (props.blockType == 'Fair') ? 'medium' : (props.blockType == 'Closed') ? 'medium' : 'medium'

  return (
    <>
    <div className="my-2 w-full flex relative">
    <a className="absolute -top-48" id={props.blockId}/>
    {props.orderNumber ? (
      <div className="my-auto h-full w-24"><span className="text-2xl pl-6">{props.orderNumber}</span></div>
      ) : null}
        <div className={`border bg-${blockColor} rounded px-4 py-3 h-full w-full items-center justify-between flex`}>
          <div className="flex w-full items-center">
          {props.smallImage ? (
            <div className="w-20 h-20 relative">
            <a href={props.ctaLink ? props.ctaLink : props.blockLink} target="_blank">
            <Image src={props.smallImage} alt={props.smallImageAlt} 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </a>
            </div>) : null}
          <div className="flex flex-col w-4/6 w-full ml-4">
          <span className={`title-font font-${fontWeight} font-bold`}>
          <a href={props.ctaLink ? props.ctaLink : props.blockLink} target="_blank" className="hover:underline">
          {props.blockBody}
          </a></span>
          <span className={`${typeColor} font-${fontWeight}`}>
          <a href="/models" target="_blank" className="hover:underline">
          {props.blockType}
          </a>
          </span>
          {props.blockDescription ? (
            <span className="py-1 pr-2">{props.blockDescription}
            {props.blockDescriptionLinkTitle ? (<a href={props.blockLink} target="_blank" className="hover:underline"> 
              <span className="font-semibold underline">{props.blockDescriptionLinkTitle}</span>
              </a>) : (null)}
            </span>
            ) : (null)}
          </div>
          <div className="flex w-2/6 justify-center items-center">
          {props.orderLink ? (
            <a href={props.orderLink} target="_blank" className="hover:underline">
            <span className="text-red-500 font-bold">{props.orderLinkTitle}</span>
            </a>
          ) : props.ctaLink ? (
          <a href={props.ctaLink} target="_blank" className="hover:underline">
            <span className="text-blue-500 font-bold">{props.ctaLinkTitle}</span>
            </a>
          
          ) : props.blockLink ? (
          <a href={props.blockLink} target="_blank" className="hover:underline">
          <span className="text-gray-400">{props.blockLinkTitle}</span>
          </a>
          ) : null}
          </div>
          </div>
          
          </div>
      </div>
      </>
  );
}


export default SquareBlock;
  