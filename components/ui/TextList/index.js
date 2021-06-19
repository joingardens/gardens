import React from "react";
import PropTypes from  "prop-types";
import urlify from '@/utils/helpers.js';

function LightFeatureH(props) {

  const listItems = props.items.map(item => 
    <a href={'#' + urlify(item)} className="w-full" key={urlify(item)}>
    <div className="flex items-center px-2 py-2">
                <span className={`bg-${props.theme}-100 text-${props.theme}-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center`}>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
               {item}
               </div>
              </a>
    )
  
  return (
            <div className="flex flex-col h-full mt-0.5 overflow-y-auto space-y-2.5 items-center w-full bg-gray-50 shadow-inner">
            <div className="h-4" />
              {listItems}
            </div>
  );
}

LightFeatureH.defaultProps = {
  theme: 'indigo'
};

LightFeatureH.propTypes = {
  theme: PropTypes.string.isRequired
};

export default LightFeatureH;