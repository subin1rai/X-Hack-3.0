import Sidebar from "../components/Sidebar";
import React from "react";
import Topbar from "../components/Topbar";

const SellerChat = () => {
  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
      </div>
    </div>
  );
};

export default SellerChat;
