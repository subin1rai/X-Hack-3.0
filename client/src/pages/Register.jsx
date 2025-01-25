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
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = async (e) => {
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
      if (user.role === "seller") {
        const response = await axios.post(`${baseUrl}/api/register`, user);
      } else if (user.role === "farmer") {
        const response = await axios.post(
          `${baseUrl}/api/farmers/register`,
          user
        );
      }

      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.ErrorMessage?.[0]?.message) {
        setError(error.response.data.ErrorMessage[0].message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(error);

  return (
    <div className="flex justify-around w-screen h-screen items-center  ">
      <div className="flex flex-col justify-center items-center  flex-1">
        <img src={images.register} alt="" className="w-50% h-50%" />
        <h3 className="font-bold text-3xl">
          Welcome to
          <span className="text-[#2D775C]"> Annatripti</span>{" "}
        </h3>
        <p></p>
      </div>
      <div className="flex flex-col gap-3 items-center flex-1">
        <h3 className="font-bold text-3xl">Create your account!</h3>
        <p>Welcome! please fill the details to get started...</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-6"
        >
          {error && (
            <p className="bg-red-400 text-white rounded-md p-4 w-[400px] ">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter your fullname"
              className="border border-gray-400 px-4 py-3 w-[400px] rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="">
              Email
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="border border-gray-400 px-4 py-3 w-[400px] rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">PAN Image</label>
            <input
              type="file"
              name="kycImage"
              onChange={handleImageUpload}
              placeholder="Enter your fullname"
              className="border border-gray-400 px-4 py-3 w-[400px] rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Role</label>
            <select
              name="role"
              id=""
              className="border border-gray-400 px-4 py-3 w-[400px] rounded-xl"
              onChange={handleChange}
            >
              <option value="">Select a role</option>
              <option value="farmer">Farmer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="border border-gray-400 px-4 py-3 w-[400px] rounded-xl"
            />
          </div>

          {loading ? (
            <button className="bg-[#2D775C] text-white w-[400px] rounded-xl py-3 mt-6">
              Registering....
            </button>
          ) : (
            <button className="bg-[#2D775C] text-white w-[400px] rounded-xl py-3 mt-6">
              Register now
            </button>
          )}
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-[#2D775C] font-bold">
              login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
