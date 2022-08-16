import React from "react";
import PropTypes from  "prop-types";

function LightHeroB(props) {
  
  return (
    <section className="text-gray-600 body-font">
      <div className={`mx-auto flex px-5 md:pb-12 pt-24 items-center justify-center flex-col`}>
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 mt-4 font-bold text-gray-900">
            {props.titleTitle}
          </h1>
          <p className="leading-relaxed text-gray-900 text-lg">
            {props.titleDescription}
          </p>
        </div>
        {/*
          <div className="flex justify-center">
            <button className={`inline-flex text-white bg-${props.theme}-500 border-0 py-2 px-6 focus:outline-none hover:bg-${props.theme}-600 rounded text-lg`}>
              Button
            </button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
              Button
            </button>
          </div>
        */}
      </div>
    </section>
  );
}

LightHeroB.defaultProps = {
  theme: 'indigo'
};

LightHeroB.propTypes = {
  theme: PropTypes.string.isRequired
};

export default LightHeroB;