import React from "react";
import PropTypes from  "prop-types";
import SquareBlock from '../SquareBlock';
import urlify from '../../../utils/helpers.js';
import Link from 'next/link'

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
            <span className="hover:underline text-center md:text-end">
            <a href="#" className="text-gray-700">Jump to top</a></span>
          </div>
            <p className="leading-relaxed text-base my-4">
              {props.categoryDescription}
            </p>
            {props.children}
            {props.addLink ? (
              <div className="w-full flex justify-end md:justify-center py-2">
              <Link href={props.addLink}>
        <button className="inline-flex items-center bg-white border border-black py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-2 md:mt-0">
          Add a tool
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
</svg>
        </button>
        </Link>
        </div>
        ) : null}
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
