import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

const FarmerDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [farmerData, setFarmerData] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=d7e95cc5eb484c4f9c5152226252501&q=Dharan`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setWeatherData(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setLoading(false);
        }
      };

    const fetchFarmer = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseUrl}/api/dashboard/farmer`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setFarmerData(response.data.Result);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
      }
    };

    fetchWeather();
    fetchFarmer();
  }, []);

  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        {/* Top Row: Weather, Finance, Revenue */}
        <div className="p-4 flex flex-row gap-4">
          {/* Weather Card */}
          <div className="bg-white shadow rounded-lg p-6 w-[30%]">
            {loading ? (
              <p>Loading weather data...</p>
            ) : weatherData ? (
              <div className="flex justify-between px-6">
                <div>
                  <h2 className="text-lg font-semibold p-2 bg-[#2D775C] text-white px-4 rounded-3xl mb-2">
                    {weatherData.location.name}
                  </h2>
                  <p className="font-semibold text-lg">
                    {new Date().toLocaleDateString("en-US", { weekday: "long" })}
                  </p>
                  <p className="font-bold text-4xl">
                    {Math.round(weatherData.current.temp_c)}°C
                  </p>
                </div>

                <div className="text-center">
                  <img
                    src={`http:${weatherData.current.condition.icon}`}
                    alt={weatherData.current.condition.text}
                    className="w-24 h-24"
                  />
                  <p className="font-semibold text-lg">
                    {weatherData.current.condition.text}
                  </p>
                </div>
              </div>
            ) : (
              <p>Unable to fetch weather data.</p>
            )}
          </div>

          {/* Finance Card */}
          <div className="bg-white shadow rounded-lg p-6 w-[30%]">
            <p className="text-xl font-semibold">Finance</p>
            {/* Add finance content here */}
            {farmerData ? (
              <p>Total Earnings: ${farmerData.earnings.total || 0}</p>
            ) : (
              <p>Loading finance data...</p>
            )}
          </div>

          {/* Revenue Card */}
          <div className="bg-white shadow rounded-lg p-6 w-[30%]">
            <p className="text-xl font-semibold">Revenue</p>
            {/* Add revenue content here */}
            {farmerData ? (
              <p>Total Value: ${farmerData.overview.totalValue || 0}</p>
            ) : (
              <p>Loading revenue data...</p>
            )}
          </div>
        </div>

        {/* Below Content: Overview and Recent Activity */}
        <div className="p-4 flex flex-col gap-4">
          {/* Overview Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-xl font-semibold mb-4">Overview</p>
            {farmerData ? (
              <div>
                <p>Total Plants: {farmerData.overview.totalPlants}</p>
                <p>Total Stock: {farmerData.overview.totalStock}</p>
                <p>Average Price: ${farmerData.overview.avgPrice.toFixed(2)}</p>
              </div>
            ) : (
              <p>Loading overview data...</p>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-xl font-semibold mb-4">Recent Activity</p>
            {farmerData ? (
              <div>
                <p className="font-semibold">Orders:</p>
                {farmerData.recentActivity.orders.map((order, index) => (
                  <div key={index} className="p-2 border-b">
                    <p>Buyer: {order.buyer}</p>
                    <p>Amount: ${order.amount}</p>
                    <p>Status: {order.status}</p>
                    <p>
                      Date:{" "}
                      {new Date(order.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading recent activity...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
