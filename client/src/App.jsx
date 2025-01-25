import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router";
import SellerDashboard from "./pages/SellerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Add from "./pages/Add";
import Explore from "./pages/Explore";
import Chat from "./pages/Chat";
import Community from "./pages/Community";
import Recommandation from "./pages/Recommandation";
import DetectDisease from "./pages/DetectDisease";
import User from "./pages/User";
import VerifyFarmer from "./pages/VerifyFarmer";
import VerifySeller from "./pages/VerifySeller";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        <Route path="/farmerDashboard" element={<FarmerDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/add" element={<Add />} />
        <Route path="/detectDisease" element={<DetectDisease />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/community" element={<Community />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/recommandations" element={<Recommandation />} />
        <Route path="/user" element={<User/>} />
        <Route path="/verifyFarmer" element={<VerifyFarmer />} />
        <Route path="/verifySeller" element={<VerifySeller />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
