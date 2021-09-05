import React from "react";
import PropTypes from  "prop-types";
import urlify from '../../../utils/helpers.js';

function SectionsAndCategories(props) {

    let allSections = props.sections.map(section => {

    let categoryItems = section.categories.map(item => {
      if (item){
        return (<div className="py-1 w-full">
    <a href={item ? ('#' + urlify(item)) : null} className="w-full h-full" key={item ? urlify(item) : ''}>
    
                <span className="text-blue-500 font-semibold w-full hover:underline">{item}</span>
               
              </a>
               </div>)
      }
    
    });
    if (section.section){

      return (
        <div className="ml-4 pr-4 py-4 md:py-12 w-full md:w-48 md:h-full" key={section.section}>
        <div className="py-2 md:py-0 md:h-12 w-full md:w-auto">
        <div className="pb-2 border-b border-gray-900">
        <span className="font-bold">{section.section}
        </span>
        </div>
        </div>
        <div className="flex-col mt-2 md:mt-0 h-full">{categoryItems}</div>
        </div>
        ) 
    }
    })
  
  
  return (
            <div className="flex flex-col md:flex-row mt-0.5">
            <div className="h-4" />
              {allSections}
            </div>
  );
}


export default SectionsAndCategories;
