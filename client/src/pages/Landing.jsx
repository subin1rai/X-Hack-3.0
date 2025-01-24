import React from "react";
import Spline from '@splinetool/react-spline';

const Landing = () => {
  return <div className="bg-[#ECECEC]">
    {/* navbar */}
    <div className="flex justify-between items-center px-16 pt-4">
      <div>
        <p>logo</p>
      </div>
      <div className="flex">      
        <ul className="flex gap-8">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/login">Contact</a></li>
        </ul>
      </div>
      <div className="flex gap-4">
        <button className="border border-red px-8 py-2 rounded-full">Login</button>
        <button className="px-8 py-2 rounded-full bg-[#2D775C] text-white">Register</button>
      </div>
    </div>

    {/* hero */}
    <div className="relative flex justify-between items-center pt-4">
  {/* Text Section */}
  <div className="absolute z-10 top-[220px] left-1/4 text-center">
    <h1 className="text-4xl font-bold">Hero</h1>
    <p className="text-lg ">lorem ipsum dolor sit amet</p>
  </div>

  {/* 3D Model */}
  <div className="h-[800px] w-screen">
    <Spline scene="https://prod.spline.design/tVbpwvGMzW2WeGTc/scene.splinecode" />
  </div>
</div>


  {/*  */}

  <div>
    <h1>Features</h1>
    <div className="flex justify-between">
      <div>
        <h1>Feature 1</h1>
        <p>lorem ipsum dolor sit amet</p>
      </div>
      <div>
        <h1>Feature 2</h1>
        <p>lorem ipsum dolor sit amet</p>
      </div>
      <div>
        <h1>Feature 3</h1>
        <p>lorem ipsum dolor sit amet</p>
      </div>
    </div>
  </div>
  </div>;
};

export default Landing;

