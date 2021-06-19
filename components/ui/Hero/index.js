import React from "react";
import PropTypes from  "prop-types";
import Link from 'next/link';


function LightHeroD(props) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 pt-16 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {props.heading}
          </h1>
          <p className="mb-8 leading-relaxed">
            {props.subheading}
            <br/>
            {props.subheading1}
          </p>
          {/*
          <div className="flex w-full md:justify-start justify-center items-end">
            <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
              <label
                htmlFor="hero-field"
                className="leading-7 text-sm text-gray-600"
              >
                {props.button_title}
              </label>
              <input
                type="text"
                id="hero-field"
                name="hero-field"
                className={`w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-${props.theme}-200 focus:bg-transparent focus:border-${props.theme}-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              />
            </div>
            <button className={`inline-flex text-white bg-accents-0 border-0 py-2 px-6 focus:outline-none hover:bg-accents-1 rounded text-lg`}>
              Button
            </button>
          </div>*/}
          <p className="text-sm mt-2 text-gray-500 mb-4 w-full">
            {props.button_comment}
          </p>
          <div className="flex lg:flex-row flex-col items-start w-4/5 lg:w-auto">
             <Link href="/flows">
            <button className="bg-blue-100 inline-flex py-3 px-5 w-full lg:w-auto rounded-lg items-center hover:bg-blue-200 focus:outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M20 22H6.5A3.5 3.5 0 0 1 3 18.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2v-3H6.5a1.5 1.5 0 0 0 0 3H19z"/></svg>
              <span className="ml-4 flex items-start flex-col leading-none">
                <span className="text-xs text-gray-600 mb-1">{props.button_title_1}</span>
                <span className="title-font font-medium">{props.button_body_1}</span>
              </span>
            </button>
            </Link>
             <Link href="/outputs">
            <button className="bg-yellow-100 inline-flex py-3 px-5 w-full lg:w-auto lg:mt-0 mt-4 rounded-lg items-center lg:ml-4 md:mt-4 mt-0 lg:mt-0 hover:bg-yellow-200  focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M6.5 2h11a1 1 0 0 1 .8.4L21 6v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6l2.7-3.6a1 1 0 0 1 .8-.4zm12 4L17 4H7L5.5 6h13zM9 10H7v2a5 5 0 0 0 10 0v-2h-2v2a3 3 0 0 1-6 0v-2z"/></svg>
              <span className="ml-4 flex items-start flex-col leading-none">
                <span className="text-xs text-gray-600 mb-1">
                  {props.button_title_2}
                </span>
                <span className="title-font font-medium">{props.button_body_2}</span>
              </span>
            </button>
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src={props.imagesrc} />
        </div>
      </div>
    </section>
  );
}

LightHeroD.defaultProps = {
  theme: 'indigo'
};

LightHeroD.propTypes = {
  theme: PropTypes.string.isRequired
};

export default LightHeroD;