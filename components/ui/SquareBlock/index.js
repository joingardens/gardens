import React from "react";
import Image from "next/image"
import getRandomGradient from "../../../utils/getRandomGradient";
import MarkdownIt from "markdown-it"

function SquareBlock(props) {

  const md = new MarkdownIt();

  const blockColor = (props.blockType == 'Open') ? 'green-50 hover:bg-green-100' : (props.blockType == 'Fair') ? 'green-50 hover:bg-green-100' : (props.blockType == 'Exportable') ? 'gray-50 hover:bg-gray-100' : 'gray-50 hover:bg-gray-100';
  const typeColor = (props.blockType == 'Open') ? 'text-green-500' : (props.blockType == 'Fair') ? 'text-green-500' : 'text-primary'
  const fontWeight = (props.blockType == 'Open') ? 'medium' : (props.blockType == 'Fair') ? 'medium' : (props.blockType == 'Closed') ? 'medium' : 'medium'
  const pillColor = getRandomGradient();

  return (
    <>
    <div className={`my-2 w-full flex relative ${props.blockType ? ('border border-gray-300 bg-' + blockColor) : null}`}>
    <a className="absolute -top-48" id={props.blockId}/>
    <a href={props.ctaLink ? props.ctaLink : props.blockLink} className="text-gray-900 w-full h-full" target="_blank">

        <div className={`px-4 py-3 h-full w-full items-center flex flex-col`}>  
          <div className="flex w-full items-center">
          {props.smallImage ? (
            <div className="w-20 h-20 relative mr-4">
            <Image src={props.smallImage} alt={props.smallImageAlt} 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </div>) : null}
          <div className="flex flex-col w-11/12 mx-auto">
          <div className="flex items-center">
          {props.orderNumber ? (
      <div className={`-ml-1 mr-4 rounded bg-seaweed`}>
      <div className="w-full h-full px-2 py-1 ">
      <span className="text-md text-white">{'Step ' + props.orderNumber}</span>
      </div>
      </div>
      ) : null}
          <div className="flex flex-col">
          <span className={`title-font font-${fontWeight} font-semibold text-lg`}>
          {props.blockBody}
          </span>
          {/*<a href="/models" target="_blank" className={`${typeColor} text-gray-900 hover:underline no-underline font-${fontWeight}`}>*/}
          <span>
          {((props.blockType == 'Open') ? 'Open-source' : (props.blockType == 'Fair') ? 'Fair-code' : (props.blockType) ? 'Closed-source' : null)} 
          </span>
          {props.blockDescriptionLinkTitle ? (
            <span>
            <a href={props.blockLink} target="_blank" className="no-underline font-medium text-gray-900"> 
              Using <span className="font-medium no-underline">{props.blockDescriptionLinkTitle}</span>
              </a>
          
          </span>) : (null)}
          </div>
          </div>
          {props.blockDescription ? (
            <div dangerouslySetInnerHTML={{__html: md.render(props.blockDescription)}} 
            className="py-1 pr-2 prose" /> 
            ) : (null)}
          </div>
          {(props.orderLink || props.ctaLink || props.blockLink) ? (<div className="flex w-2/6 justify-center items-center">
            {props.orderLink ? (
            <a href={props.orderLink} target="_blank" className="hover:underline">
            <span className="text-red-500 font-bold">{props.orderLinkTitle}</span>
            </a>
          ) : props.ctaLink ? (
            <span className="text-blue-500 font-bold">{props.ctaLinkTitle}</span>
          ) : props.blockLink ? (
          <a href={props.blockLink} target="_blank" className="hover:underline">
          <span className="text-gray-400">{props.blockLinkTitle}</span>
          </a>
          ) : null}
          </div>) : null}
          </div>
          {props.bigImages}
          </div>
          </a>
      </div>
      </>
  );
}


export default SquareBlock;
  