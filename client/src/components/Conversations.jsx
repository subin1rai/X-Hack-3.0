import React from "react";
import images from "../constants/images";

const Conversations = ({ isActive }) => {
  return (
    <div
      className={` flex gap-3 items-center rounded-2xl p-3 transition-colors duration-300 ${
        isActive ? "bg-[#DCDCDC]" : "bg-white hover:bg-[#DCDCDC] cursor-pointer"
      }`}
    >
      <img
        src={images.farmerMan}
        alt=""
        className="w-12 h-12 rounded-full m-2"
      />
      <div>
        <h2 className="font-medium">Anijil Neupane</h2>
        <p className="">Hello Anjil, How are you?</p>
      </div>
    </div>
  );
};

export default Conversations;
