import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PlantRequests from "../components/plantRequests";

const SellerNeeds = () => {
  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />

        <div>
          <PlantRequests />
        </div>
      </div>
    </div>
  );
};

export default SellerNeeds;
