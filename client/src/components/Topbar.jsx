import React from "react";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex w-[85vw] bg-white p-6 justify-between">
      <p className="font-bold text-2xl">Good Morning, Admin</p>

      <div className="flex gap-6  items-center">
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
          class="lucide lucide-bell"
        >
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        </svg>

        <div className="flex items-center gap-4">
          <img
            className="w-9 h-9 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
            alt=""
          />
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
