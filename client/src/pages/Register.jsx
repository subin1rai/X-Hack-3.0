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

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        console.error("Invalid file type. Only JPEG and PNG are allowed.");
        return;
      }

      // Convert file to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({
          ...prev,
          kycImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(user.kycImage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/register`, user);

      console.log(response);

      navigate("/login");

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
        <h3 className="font-bold text-3xl">Create your account!</h3>
        <p>Welcome! please fill the details to get started...</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-6"
        >
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
              onChange={handleImageChange}
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
