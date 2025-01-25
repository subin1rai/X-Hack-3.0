import React, { useState, useEffect } from "react";

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState("C"); // Celsius or Fahrenheit

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=d7e95cc5eb484c4f9c5152226252501&q=Chicago`
        );
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
      <h1 className="text-2xl font-semibold mb-1">Good Morning!</h1>
      <p className="text-gray-500 mb-4">
        Optimize Your Farm Operations with Real-Time Insights
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{weatherData.location.name}</h2>
              <p className="text-gray-500">
                {new Date(weatherData.location.localtime).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-4xl font-bold">
                {unit === "C"
                  ? `${Math.round(weatherData.current.temp_c)}°C`
                  : `${Math.round(weatherData.current.temp_f)}°F`}
              </p>
              <p className="text-sm text-gray-500">
                High: {Math.round(weatherData.forecast?.forecastday[0]?.day.maxtemp_c)}° | Low:{" "}
                {Math.round(weatherData.forecast?.forecastday[0]?.day.mintemp_c)}°
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={`http:${weatherData.current.condition.icon}`}
                alt={weatherData.current.condition.text}
                className="w-16 h-16"
              />
              <p className="text-gray-700">{weatherData.current.condition.text}</p>
              <p className="text-sm text-gray-500">Feels Like: {weatherData.current.feelslike_c}°C</p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <button
              onClick={toggleUnit}
              className={`flex items-center gap-2 p-2 border rounded-full ${
                unit === "C" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              C
            </button>
            <button
              onClick={toggleUnit}
              className={`flex items-center gap-2 p-2 border rounded-full ml-2 ${
                unit === "F" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              F
            </button>
          </div>
        </div>
      ) : (
        <p>Unable to fetch weather data</p>
      )}
    </div>
  );
};

export default WeatherCard;
