import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SellerTable from "../components/SellerTable";

const VerifySeller = () => {
  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />

        <div>
          <SellerTable />
        </div>
      </div>
    </div>
  );
};

export default VerifySeller;
