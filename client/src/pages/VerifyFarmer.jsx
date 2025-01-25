import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import FarmerTable from "../components/FarmersTable";

const VerifyFarmer = () => {
  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />

        <div>
          <FarmerTable />
        </div>
      </div>
    </div>
  );
};

export default VerifyFarmer;
