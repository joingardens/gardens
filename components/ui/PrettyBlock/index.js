import React from "react";
import PropTypes from  "prop-types";
import getRandomGradient from '../../../utils/getRandomGradient'

function PrettyBlock(props) {

  const blockColor = getRandomGradient();
  const typeColor = (props.blockType == 'Open') ? 'text-primary' : (props.blockType == 'Fair') ? 'text-primary' : (props.blockType == 'Closed') ? 'text-primary' : 'text-primary'
  const blockWidth = props.fullWidth ? 'w-full' : 'w-48 md:w-64'
  const blockHeight = props.flexibleHeight ? '' : 'h-20'

  return (
    <>
    <div className={`my-4 ml-2 flex ${blockHeight}`}>
    <a href={props.blockLink} className={'font-semibold inline-flex items-center text-center mr-4'}>
        <div className={`border transition hover:shadow-md hover:border-none rounded py-4 h-full ${blockWidth} items-center justify-center flex ${blockColor}`}>
          <div className="flex items-center">
          {/*<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>*/}
          <div className="flex flex-col px-2">
          <span className={"title-font text-md md:text-lg"}>{props.blockBody}</span>
          {props.blockDescription ? (
            <span className="py-1">{props.blockDescription} <a href={props.blockDescriptionLinkHref}>
            {props.blockDescriptionLinkTitle ? (<span className="font-semibold underline">{props.blockDescriptionLinkTitle}</span>) : (null)}
            </a>
            </span>
            ) : (null)}  
            </div>
          </div>
        </div>
        </a>
      </div>
      </>
  );
}

PrettyBlock.defaultProps = {
  theme: 'indigo'
};

PrettyBlock.propTypes = {
  theme: PropTypes.string.isRequired
};

export default PrettyBlock;
  
