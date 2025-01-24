import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { BrowserRouter, Route, Routes } from "react-router";
import SellerDashboard from "./pages/SellerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<SellerDashboard />} />
        <Route path="/login" element={<FarmerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
