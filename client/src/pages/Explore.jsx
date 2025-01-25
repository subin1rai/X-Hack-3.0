import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

const Explore = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/plantsrequest/farmer/seller-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        setVegetables(response.data.Result.plants);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, [baseUrl, token]);
  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />

        <div></div>
      </div>
    </div>
  );
};

export default Explore;
