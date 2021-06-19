import React from "react";
import PropTypes from  "prop-types";

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
    <a href={props.orderLink ? props.orderLink : props.ctaLink ? props.ctaLink : props.blockLink} className="h-full w-full" target="_blank">
        <div className={`border bg-${blockColor} rounded px-4 py-3 h-full w-full items-center justify-between flex`}>
          <div className="flex w-full">
          <div className="flex flex-col w-4/6 w-full">
          <span className={`title-font font-${fontWeight} font-bold`}>{props.blockBody}</span>
          <span className={`${typeColor} font-${fontWeight}`}>
          {props.blockType}
          </span>
          {props.blockDescription ? (
            <span className="py-1 pr-2">{props.blockDescription}
            {props.blockDescriptionLinkTitle ? (<span className="font-semibold underline">{props.blockDescriptionLinkTitle}</span>) : (null)}
            </span>
            ) : (null)}
          </div>
          <div className="flex w-2/6 justify-center items-center">
          {props.orderLink ? (
            <span className="text-red-500 font-bold">{props.orderLinkTitle}</span>
          ) : props.ctaLink ? (
            <span className="text-blue-500 font-bold">{props.ctaLinkTitle}</span>
          ) : props.blockLink ? (
          <span className="text-gray-400">{props.blockLinkTitle}</span>
          ) : null}
          </div>
          </div>
          
          </div>
          </a>
      </div>
      </>
  );
}

SquareBlock.defaultProps = {
  theme: 'indigo'
};

SquareBlock.propTypes = {
  theme: PropTypes.string.isRequired
};

export default SquareBlock;
  