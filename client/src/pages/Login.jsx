import axios from "axios";
import React, { useState } from "react";
import images from "../constants/images";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;

  console.log(baseUrl);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/login`, user);

      console.log(response);
      if (response.data.Result.user.role == "seller") {
        navigate("/sellerDashboard");
      } else if (response.data.Result.user.role == "farmer") {
        navigate("/farmerDashboard");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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
        <h3 className="font-bold text-3xl">
          Login to <span className="text-[#2D775C]"> Annatripti</span>{" "}
        </h3>
        <p>Welcome back! please login to continue...</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-6"
        >
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
              logging in....
            </button>
          ) : (
            <button className="bg-[#2D775C] text-white w-[400px] rounded-xl py-3 mt-6">
              Login now
            </button>
          )}

          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-[#2D775C] font-bold">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
