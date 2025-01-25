import React from "react";
import Spline from "@splinetool/react-spline";
import images from "../constants/images";
import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="bg-[#ECECEC]">
      {/* navbar */}
      <div className="flex justify-between items-center px-16 pt-4">
        <div>
        <p className="font-bold text-3xl">
            Anna<span className="text-[#2D775C]">Tripti</span>
          </p>
        </div>
        <div className="flex">
          <ul className="flex gap-8">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/login">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <button className="border border-red px-8 py-2 rounded-full">
        <Link to={'/login'}>Login</Link>
          </button>
          <button className="px-8 py-2 rounded-full bg-[#2D775C] text-white">
            <Link to={"/register"}>Register</Link>
          </button>
        </div>
      </div>

      {/* hero */}
      <div className="relative flex items-center justify-between h-screen bg-gradient-to-br from-green-50 to-green-200">
  {/* Text Section */}
  <div className="absolute z-10 top-[20%] left-[10%] max-w-[600px]">
    <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
      Revolutionizing Farming
      <br />
      with
      <span className="text-green-600 max-w-[700px]"> AI-Powered Insights</span>
    </h1>
    <p className="text-xl text-gray-600 mt-4 leading-relaxed">
      Detect diseases, plan your crops, and connect with markets—all in one platform.
    </p>
    <div className="mt-6 flex gap-4">
      <button className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-700 transition">
        Get Started
      </button>
      <button className="px-6 py-3 bg-gray-200 text-gray-800 text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition">
        Learn More
      </button>
    </div>
  </div>

  {/* 3D Model Section */}
  <div className="w-full h-screen">
    <Spline scene="https://prod.spline.design/tVbpwvGMzW2WeGTc/scene.splinecode" />
  </div>
</div>


    {/* Features Section */}
<div className="px-10 lg:px-32 mb-16">
  <h1 className="text-center mt-16 font-bold text-4xl font-sans text-gray-800">
    Why Choose Annatripti?
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
    {/* Feature Card 1 */}
    <div className="flex flex-col justify-center items-center text-center shadow-lg p-8 rounded-xl bg-white hover:shadow-2xl transition-shadow duration-300">
      <img
        src={images.plantd}
        alt="Plant Disease Detection"
        className="w-[120px] h-[120px] mb-4"
      />
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Plant Disease Detection
      </h2>
      <p className="text-gray-500">
        Instantly identify diseases and get real-time solutions.
      </p>
    </div>

    {/* Feature Card 2 */}
    <div className="flex flex-col justify-center items-center text-center shadow-lg p-8 rounded-xl bg-white hover:shadow-2xl transition-shadow duration-300">
      <img
        src={images.plantd}
        alt="Seasonal Crop Suggestions"
        className="w-[130px] h-[130px] mb-4"
      />
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Seasonal Crop Suggestions
      </h2>
      <p className="text-gray-500">
        Smart recommendations for seasonal farming.
      </p>
    </div>

    {/* Feature Card 3 */}
    <div className="flex flex-col justify-center items-center text-center shadow-lg p-8 rounded-xl bg-white hover:shadow-2xl transition-shadow duration-300">
      <img
        src={images.shopplant}
        alt="Farmer-Marketer Marketplace"
        className="w-[120px] h-[120px] mb-4"
      />
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Farmer-Marketer Marketplace
      </h2>
      <p className="text-gray-500">
        Bridge the gap between farmers and marketers.
      </p>
    </div>
  </div>
</div>


      {/* farmer */}
    {/* About Farmers Section */}
<div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-32 py-16 bg-white">
  {/* Left: Farmer Image */}
  <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
    <img
      src={images.farmerMan}
      alt="Farmer holding fresh produce"
      className="w-3/4 rounded-lg"
    />
  </div>

  {/* Right: Farmer Information */}
  <div className="w-full lg:w-1/2">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Empowering Farmers with AI and Community Support
    </h2>
    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
      Annatripti is dedicated to helping farmers thrive. By leveraging AI and community support, we provide the tools and insights farmers need to succeed in a sustainable way.
    </p>
    <ul className="space-y-4">
      <li className="flex items-center">
        <span className="text-green-600 text-xl mr-2">✔</span>
        <span className="text-gray-700 text-lg">Access disease diagnosis tools</span>
      </li>
      <li className="flex items-center">
        <span className="text-green-600 text-xl mr-2">✔</span>
        <span className="text-gray-700 text-lg">Gain seasonal crop insights</span>
      </li>
      <li className="flex items-center">
        <span className="text-green-600 text-xl mr-2">✔</span>
        <span className="text-gray-700 text-lg">Share knowledge in the community blog</span>
      </li>
      <li className="flex items-center">
        <span className="text-green-600 text-xl mr-2">✔</span>
        <span className="text-gray-700 text-lg">Diret connection with the marketers</span>
      </li>
    </ul>
    <button className="mt-8 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">
      Learn More
    </button>
  </div>
</div>


    {/* marketer */}
    {/* Seller Section */}
<div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-32 py-16 bg-gray-50">
  {/* Left: Text Content */}
  <div className="w-full lg:w-1/2">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Streamline Your Plant Sales
    </h2>
    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
      At Annatripti, we make it easy for farmers to connect with marketers. With simple tools and a user-friendly interface, selling your crops has never been easier.
    </p>
    <ul className="space-y-4">
      <li className="flex items-center">
        <span className="text-green-600 text-xl mr-2">✔</span>
        <span className="text-gray-700 text-lg">List your crops with quantities easily.</span>
      </li>
      <li className="flex items-center">
        <span className="text-green-600 text-xl mr-2">✔</span>
        <span className="text-gray-700 text-lg">Ensure direct transactions with buyers.</span>
      </li>
    </ul>
    <button className="mt-8 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">
      Start Selling
    </button>
  </div>

  {/* Right: Image/Illustration */}
  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
    <img
      src={images.seller}
      alt="Marketplace Dashboard"
      className="w-4/5 lg:w-full rounded-lg shadow-md"
    />
  </div>
</div>

<div className="py-16 bg-gray-100 text-center">
  <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
  <div className="flex justify-center gap-16">
    <div>
      <h3 className="text-4xl font-bold text-green-600">10,000+</h3>
      <p className="text-gray-700">Farmers Empowered</p>
    </div>
    <div>
      <h3 className="text-4xl font-bold text-green-600">500+</h3>
      <p className="text-gray-700">Marketers Connected</p>
    </div>
    <div>
      <h3 className="text-4xl font-bold text-green-600">1 Million+</h3>
      <p className="text-gray-700">Crops Sold</p>
    </div>
  </div>
</div>


    {/* Footer */}
<footer className="bg-[#2D775C] text-gray-300 py-12 px-8 lg:px-32">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* About Section */}
    <div>
      <h3 className="text-lg font-bold text-white mb-4">About Annatripti</h3>
      <p className="text-sm leading-relaxed">
        Annatripti is revolutionizing farming with AI-powered tools and community-driven solutions. Empowering farmers, optimizing plant care, and bridging the gap between producers and marketers.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <a href="#home" className="hover:text-green-400 transition">
            Home
          </a>
        </li>
        <li>
          <a href="#features" className="hover:text-green-400 transition">
            Features
          </a>
        </li>
        <li>
          <a href="#community" className="hover:text-green-400 transition">
            Community Blog
          </a>
        </li>
        <li>
          <a href="#marketplace" className="hover:text-green-400 transition">
            Marketplace
          </a>
        </li>
      </ul>
    </div>

    {/* Contact Section */}
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
      <p className="text-sm mb-2">
        Email: <a href="mailto:support@annatripti.com" className="hover:text-green-400 transition">support@annatripti.com</a>
      </p>
      <p className="text-sm mb-2">
        Phone: <a href="tel:+1234567890" className="hover:text-green-400 transition">+1 234 567 890</a>
      </p>
      <div className="flex gap-4 mt-4">
        <a href="#facebook" className="hover:text-green-400 transition">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#twitter" className="hover:text-green-400 transition">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#instagram" className="hover:text-green-400 transition">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#linkedin" className="hover:text-green-400 transition">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </div>

  <div className="mt-12 border-t border-gray-700 pt-6 text-center">
    <p className="text-sm">&copy; 2025 Annatripti. All Rights Reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default Landing;
