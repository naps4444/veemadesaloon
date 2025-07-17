// components/Loader.tsx
'use client';

import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-[9999] w-full h-full flex items-center justify-center bg-black bg-opacity-70">
    <RotatingLines
  visible={true}
  strokeColor="#223728"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  width="96"
/>

    </div>
  );
};

export default Loader;
