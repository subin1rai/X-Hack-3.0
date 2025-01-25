import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UserTable from "../components/UserTable";

const User = () => {
  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <div className="bg-white mt-3">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default User;
