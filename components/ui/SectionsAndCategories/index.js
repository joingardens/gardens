import PropTypes from  "prop-types";
import urlify from '../../../utils/helpers.js';
import React, { useState } from 'react';

function SectionsAndCategories(props) {

    let allSections = props.sections.map(section => {

    let categoryItems = section.categories.map(item => {
      if (item){
        return (<div className="py-1 w-full">
    <a href={item ? ('#' + urlify(item)) : null} 
    className="w-full h-full" key={item ? urlify(item) : ''}>
    <span className="w-full hover:underline">{item}</span>
    </a>
    </div>
    )
      }
    
    });
    if (section.section){

      return Section(categoryItems, section)
 
    }
    })
  
  
  return (
  <>
            <div className="pt-24 md:py-6 w-full" />
            <div className="flex flex-wrap w-full justify-center md:justify-start">
              {allSections}
            </div>
  </>
  );
}


function Section(categoryItems, section){

     const [open, setOpen] = useState(false);

      return (
        <div className="px-4 w-full max-w-xs mx-2" key={section.section}>
        <div className="my-2 w-full">
        <div className="py-2 flex w-full shadow border 
        rounded-full hover:bg-green-100 cursor-pointer"
        onClick={() => setOpen(!open)}>
        <div className="w-1/4 text-center">
        <span className="text-sm">{open ? ("▽") : ("▷")}</span>
        </div>
        <div className="w-3/4">
        <span>{section.section}</span>
        </div>
        </div>
        </div>
        {open ? (<div className="flex-col mt-2 md:mt-0 ml-3 h-full">
        {categoryItems}
        </div>) : null}
        </div>
        )
}

export default SectionsAndCategories;
