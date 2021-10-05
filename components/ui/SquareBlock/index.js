import React from "react";
import Image from "next/image"
import getRandomGradient from "../../../utils/getRandomGradient";
import MarkdownIt from "markdown-it"

function SquareBlock(props) {

  const md = new MarkdownIt();

  const blockColor = (props.blockType == 'Open') ? 'green-50' : (props.blockType == 'Fair') ? 'yellow-50' : (props.blockType == 'Exportable') ? 'gray-50' : 'gray-50';
  const typeColor = (props.blockType == 'Open') ? 'text-green-500' : (props.blockType == 'Fair') ? 'text-yellow-500' : (props.blockType == 'Closed') ? 'text-red-500' : 'text-primary'
  const fontWeight = (props.blockType == 'Open') ? 'medium' : (props.blockType == 'Fair') ? 'medium' : (props.blockType == 'Closed') ? 'medium' : 'medium'
  const pillColor = getRandomGradient();

  /*
  To-do: add links to description bodies for selected blocks

  {props.blockDescriptionLinkTitle ? (<a href={props.blockLink} target="_blank" className="hover:underline"> 
              <span className="font-semibold underline">{props.blockDescriptionLinkTitle}</span>
              </a>) : (null)}*/

  return (
    <>
    <div className="my-2 w-full flex relative">
    <a className="absolute -top-48" id={props.blockId}/>
        <div className={`border bg-${blockColor} rounded px-4 py-3 h-full w-full items-center flex flex-col`}>  
          <div className="flex w-full items-center">
          {props.smallImage ? (
            <div className="w-20 h-20 relative mr-4">
            <a href={props.ctaLink ? props.ctaLink : props.blockLink} target="_blank">
            <Image src={props.smallImage} alt={props.smallImageAlt} 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </a>
            </div>) : null}
          <div className="flex flex-col w-11/12 mx-auto">
          <div className="flex items-center">
          {props.orderNumber ? (
      <div className={`-ml-1 mr-4 rounded ${pillColor}`}>
      <div className="bg-white w-full h-full px-2 py-1 bg-opacity-50 ">
      <span className="text-md text-gray-900">{'Step ' + props.orderNumber}</span>
      </div>
      </div>
      ) : null}
          <div className="flex flex-col">
          <span className={`title-font font-${fontWeight} font-bold`}>
          <a href={props.ctaLink ? props.ctaLink : props.blockLink} target="_blank" className="hover:underline text-gray-900 no-underline">
          {props.blockBody}
          </a></span>
          <span className={`${typeColor} font-${fontWeight}`}>
          <a href="/models" target="_blank" className="hover:underline text-gray-900 no-underline">
          {props.blockType}
          </a>
          </span>
          </div>
          </div>
          {props.blockDescription ? (
            <div dangerouslySetInnerHTML={{__html: md.render(props.blockDescription)}} 
            className="mt-2 py-1 pr-2" /> 
            ) : (null)}
          </div>
          {(props.orderLink || props.ctaLink || props.blockLink) ? (<div className="flex w-2/6 justify-center items-center">
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
          </div>) : null}
          </div>
          {props.bigImages}
          </div>
      </div>
      </>
  );
}


export default SquareBlock;
  