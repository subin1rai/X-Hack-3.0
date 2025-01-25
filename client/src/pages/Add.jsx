import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Add = () => {
  return (
    <div className="flex gap-1 bg-gray-50">
    <Sidebar />
    <div className="flex flex-col">
      <Topbar />
    <h1>Add</h1> 
    </div>
  </div>
  )
}

export default Add;
