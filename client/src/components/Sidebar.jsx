import React from "react";
import images from "../constants/images";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const role = user.role;

  const isActive = (path) => {
    return location.pathname === path
      ? "text-[#2D775C] bg-[#2D775C]/5 rounded-lg"
      : "";
  };

  return (
    <div className="bg-white flex flex-col p-8 h-screen w-[280px] justify-between">
      <div className="flex flex-col gap-10">
        <div className="">
          <p className="font-bold text-3xl">
            Anna<span className="text-[#2D775C]">Tripti</span>
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {role === "admin" && (
            <>
              <Link
                className={`text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 flex gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/user"
                )}`}
                to="/user"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user-round-search"
                >
                  <circle cx="10" cy="8" r="5" />
                  <path d="M2 21a8 8 0 0 1 10.434-7.62" />
                  <circle cx="18" cy="18" r="3" />
                  <path d="m22 22-1.9-1.9" />
                </svg>
                Users
              </Link>

              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/verifyFarmer"
                )}`}
                to="/verifyFarmer"
              >
                <img
                  src={images.farmericon}
                  className="h-[28px]"
                  alt="Farmer Icon"
                />
                <span className="leading-none">Verify Farmers</span>
              </Link>

              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/verifySeller"
                )}`}
                to="/verifySeller"
              >
                <img
                  src={images.sellericon}
                  className="h-[28px]"
                  alt="Seller Icon"
                />
                Verify Sellers
              </Link>
            </>
          )}

          {role === "farmer" && (
            <>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/farmerDashboard"
                )}`}
                to="/farmerDashboard"
              >
                <img
                  src={images.dashboard}
                  className="h-[28px]"
                  alt="Dashboard Icon"
                />
                Dashboard
              </Link>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/detectDisease"
                )}`}
                to="/detectDisease"
              >
                <img src={images.ai} className="h-[28px]" alt="AI Icon" />
                Detect Disease
              </Link>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/community"
                )}`}
                to="/community"
              >
                <img
                  src={images.community}
                  className="h-[28px]"
                  alt="Community Icon"
                />
                Community
              </Link>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/recommandations"
                )}`}
                to="/recommandations"
              >
                <img
                  src={images.recommendations}
                  className="h-[28px]"
                  alt="Recommendations Icon"
                />
                Recommendations
              </Link>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/explore"
                )}`}
                to="/explore"
              >
                <img
                  src={images.explore}
                  className="h-[28px]"
                  alt="Explore Icon"
                />
                Explore Sellers
              </Link>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/add"
                )}`}
                to="/add"
              >
                <img src={images.add} className="h-[28px]" alt="Add Icon" />
                Add Items
              </Link>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/chat"
                )}`}
                to="/chat"
              >
                <img src={images.chat} className="h-[28px]" alt="Chat Icon" />
                Chat
              </Link>
            </>
          )}

          {role === "seller" && (
            <>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/sellerDashboard"
                )}`}
                to="/sellerDashboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-layout-panel-left"
                >
                  <rect width="7" height="18" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                </svg>
                Dashboard
              </Link>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/addNeeds"
                )}`}
                to="/addNeeds"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="16" />
                  <line x1="8" x2="16" y1="12" y2="12" />
                </svg>
                Add Needs
              </Link>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/exploreProducts"
                )}`}
                to="/exploreProducts"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-basket"
                >
                  <path d="m2.3 7.3 2.1 2.1c.4.4.9.6 1.4.6h12.4c.5 0 1-.2 1.4-.6l2.1-2.1c.5-.5.5-1.3 0-1.8s-1.3-.5-1.8 0L18 7.4V5c0-1.7-1.3-3-3-3H9C7.3 2 6 3.3 6 5v2.4L4.1 5.5c-.5-.5-1.3-.5-1.8 0s-.5 1.3 0 1.8z" />
                  <path d="M20 10v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V10" />
                </svg>
                Market
              </Link>
              <Link
                className={`flex items-center text-xl hover:text-[#2D775C] hover:bg-[#2D775C]/5 gap-4 px-4 py-2 rounded-lg transition-colors ${isActive(
                  "/sellerChat"
                )}`}
                to="/sellerChat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                Chats
              </Link>
            </>
          )}
        </div>
      </div>

      <div>
        <Link
          to="/login"
          className="text-xl text-red-500 hover:bg-red-50 flex justify-start items-center gap-4 px-4 py-2 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
