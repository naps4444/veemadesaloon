'use client';

import React from 'react';


const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-[9999] w-full h-full flex items-center justify-center bg-black ">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  );
};

export default Loader;
