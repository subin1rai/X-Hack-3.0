import React from "react";
import images from "../constants/images";
import { formToJSON } from "axios";
import { Link } from "react-router";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user.role;

  return (
    <div className="bg-white flex flex-col  p-8 h-screen w-[280px] justify-between">
      <div className="flex flex-col gap-10">
        <div className="">
          <p className="font-bold text-3xl">
            Anna<span className="text-[#2D775C]">Tripti</span>
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {role === "admin" && (
            <>
              <Link className="text-xl hover:text-[#2D775C] flex gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-user-round-search"
                >
                  <circle cx="10" cy="8" r="5" />
                  <path d="M2 21a8 8 0 0 1 10.434-7.62" />
                  <circle cx="18" cy="18" r="3" />
                  <path d="m22 22-1.9-1.9" />
                </svg>{" "}
                Users
              </Link>

              <Link className="text-xl  hover:text-[#2D775C]">
                Verify Farmers
              </Link>

              <Link className="text-xl  hover:text-[#2D775C]">
                Verify Sellers
              </Link>
            </>
          )}

          {role === "farmer" && (
            <>
              <Link className="text-xl  hover:text-[#2D775C]">Dashboard</Link>
              <Link className="text-xl  hover:text-[#2D775C]">
                Detect Disease
              </Link>
              <Link className="text-xl  hover:text-[#2D775C]">Community</Link>
              <Link className="text-xl  hover:text-[#2D775C]">
                Recommendations
              </Link>
              <Link className="text-xl  hover:text-[#2D775C]">
                Explore Sellers
              </Link>
              <Link className="text-xl  hover:text-[#2D775C]">Add Items</Link>
              <Link className="text-xl  hover:text-[#2D775C]">Chat</Link>
            </>
          )}

          {role === "seller" && (
            <>
              <Link
                to={"/sellerDashbaord"}
                className="text-xl  hover:text-[#2D775C] flex gap-3 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-layout-panel-left"
                >
                  <rect width="7" height="18" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                </svg>{" "}
                Dashboard
              </Link>
              <Link className="text-xl  hover:text-[#2D775C]">Add Needs</Link>
              <Link className="text-xl  hover:text-[#2D775C]">
                Explore Products
              </Link>
              <Link className="text-xl  hover:text-[#2D775C]">Chats</Link>
            </>
          )}
        </div>
      </div>

      <div className="">
        <Link
          to={"/login"}
          className="text-xl text-red-500 flex justify-start items-center gap-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>{" "}
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
