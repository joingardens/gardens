import React from "react";
import PropTypes from  "prop-types";
import SquareBlock from '@/components/ui/SquareBlock';
import urlify from '@/utils/helpers.js';

function ListItem(props) {

  

  return (
    <section className="text-gray-600 body-font w-full" id={urlify(props.categoryName)}>
      <div className="px-5 mx-auto">
        <div className="flex items-center justify-start lg:w-4/5 py-24 sm:flex-row flex-col">
          {props.emoji ? (<div className={`sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full shadow bg-gray-50 text-${props.theme}-500 sm:text-4xl text-2xl flex-shrink-0`}>
            {props.emoji}
          </div>) : null}
          <div className="flex-grow mt-6 sm:mt-0">
          <div className="flex flex-col md:flex-row w-full items-center justify-center md:justify-between">
            <h2 className="text-gray-900 text-lg sm:text-left text-center font-bold title-font font-medium mb-2">
            <a href={urlify(props.categoryName)}>
              {props.categoryName}
            </a>
            </h2>
            <span className="underline text-center md:text-end">
            <a href="#" className="text-gray-700">Jump to top</a></span>
          </div>
            <p className="leading-relaxed text-base my-4">
              {props.categoryDescription}
            </p>
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
}

ListItem.defaultProps = {
  theme: 'indigo'
};

ListItem.propTypes = {
  theme: PropTypes.string.isRequired
};

export default ListItem;