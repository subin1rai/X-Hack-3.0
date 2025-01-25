import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UserTable from "../components/UserTable";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-50 w-screen h-screen flex gap-1">
      <Sidebar />
      <div>
        <Topbar />

        <UserTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
