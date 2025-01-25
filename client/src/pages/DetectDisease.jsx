import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import images from '../constants/images';


const DetectDisease = () => {
  return (
    <div className="flex gap-1 bg-gray-50">
    <Sidebar />
    <div className="flex flex-col">
      <Topbar />
      <div className='p-6 h-[90vh] overflow-y-scroll'>
        <h1 className='text-3xl font-bold'>Heading 1</h1>
        <img src={images.detect} alt="" className='h-[65%]' />
      </div>

      {/* image */}
      <div>

      </div>
    </div>
  </div>
  )
}

export default DetectDisease;
