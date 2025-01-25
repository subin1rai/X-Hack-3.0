import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const FarmerDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log(data);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="p-4">
          <div className="bg-white shadow rounded p-6">
            {loading ? (
              <p>Loading weather data...</p>
            ) : weatherData ? (
              <div>
                <h2 className="text-lg font-semibold">{weatherData.location.name}</h2>
                <p>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</p>
                <p>{Math.round(weatherData.current.temp_c)}°C</p>
                <p>{weatherData.current.condition.text}</p>
                <img
                  src={`http:${weatherData.current.condition.icon}`}
                  alt={weatherData.current.condition.text}
                  className="w-12 h-12"
                />
              </div>
            ) : (
              <p>Unable to fetch weather data.</p>
            )}
          </div>
          <div className="mt-4">
            <p>finance</p>
            <p>revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
