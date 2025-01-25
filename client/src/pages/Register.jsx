import React, { useState } from "react";
import images from "../constants/images";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    kycImage: "",
    password: "",
    role: "",
    businessName: "",
    phone: "",
    address: "",
    farmName: "",
  });

  console.log(user);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const timestamp = Date.now();
      const extension = file.name.split(".").pop();
      const newFilename = `image_${timestamp}.${extension}`;

      setUser((prev) => ({
        ...prev,
        kycImage: newFilename,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let endpoint = "";
      let payload = {};

      // Determine the endpoint and payload based on the role
      if (user.role === "seller") {
        endpoint = `${baseUrl}/api/register`;
        payload = {
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
          address: user.address,
          kycImage: user.kycImage,
          businessName: user.businessName, // Only for seller
        };
      } else if (user.role === "farmer") {
        endpoint = `${baseUrl}/api/farmers/register`;
        payload = {
          fullName: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
          address: user.address,
          licenseImage: user.kycImage,
          farmName: user.farmName, // Only for farmer
        };
      } else {
        throw new Error("Please select a valid role.");
      }

      // Make the API request
      const response = await axios.post(endpoint, payload);

      navigate("/login");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.ErrorMessage?.[0]?.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-around w-screen h-screen items-center bg-gray-50">
      <div className="flex flex-col justify-center items-center flex-1">
        <img src={images.register} alt="" className="w-1/2 h-1/2" />
        <h3 className="font-bold text-3xl">
          Welcome to <span className="text-[#2D775C]">Annatripti</span>
        </h3>
      </div>
      <div className="flex flex-col items-center flex-1">
        <h3 className="font-bold text-3xl">Create your account!</h3>
        <p className="text-gray-500">Fill the details to get started...</p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[600px] grid grid-cols-2 gap-6 mt-8"
        >
          {error && (
            <p className="bg-red-400 text-white rounded-md p-4 col-span-2">
              {error}
            </p>
          )}

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter your fullname"
              className="border border-gray-400 px-4 py-3 rounded-xl"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="border border-gray-400 px-4 py-3 rounded-xl"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              className="border border-gray-400 px-4 py-3 rounded-xl"
              onChange={handleChange}
            >
              <option value="">Select a role</option>
              <option value="farmer">Farmer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="border border-gray-400 px-4 py-3 rounded-xl"
            />
          </div>

          {/* Business Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              name="businessName"
              onChange={handleChange}
              placeholder="Enter your business name"
              className="border border-gray-400 px-4 py-3 rounded-xl"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="border border-gray-400 px-4 py-3 rounded-xl"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              placeholder="Enter your address"
              className="border border-gray-400 px-4 py-3 rounded-xl"
            />
          </div>

          {/* Farm Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="farmName">Farm Name</label>
            <input
              type="text"
              name="farmName"
              onChange={handleChange}
              placeholder="Enter your farm name"
              className="border border-gray-400 px-4 py-3 rounded-xl"
            />
          </div>

          {/* PAN Image */}
          <div className="flex flex-col gap-2 col-span-2">
            <label htmlFor="kycImage">PAN Image</label>
            <input
              type="file"
              name="kycImage"
              onChange={handleImageUpload}
              className="border border-gray-400 px-4 py-3 rounded-xl"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            {loading ? (
              <button className="bg-[#2D775C] text-white w-full rounded-xl py-3">
                Registering...
              </button>
            ) : (
              <button className="bg-[#2D775C] text-white w-full rounded-xl py-3">
                Register now
              </button>
            )}
          </div>

          <p className="col-span-2 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2D775C] font-bold">
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
