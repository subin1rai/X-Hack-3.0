import React from "react";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const AdminDashboard = () => {
  return (
    <div className="bg-gray-50 w-screen h-screen flex gap-1">
      <Sidebar />
      <div>
        <Topbar />
      </div>
    </div>
  );
};

export default AdminDashboard;
