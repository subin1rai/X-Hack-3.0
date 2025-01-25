import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import images from "../constants/images";
import axios from "axios";
import { X, MapPin } from "lucide-react";

const AddPlantForm = ({ showForm, setShowForm, fetchVegDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    location: "",
    deliveryTime: "",
    description: "",
    category: "",
    harvestDate: "",
    shelfLife: "",
    images: []
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          Array.from(formData.images).forEach(file => {
            formDataToSend.append('images', file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.post(
        `${baseUrl}/api/plants/add`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );
      setShowForm(false);
      fetchVegDetails();
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  if (!showForm) return null;

  return (

    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
      <div className="absolute top-0 right-0 p-6">
        <button
          onClick={() => setShowForm(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Add New Plant</h2>
        <p className="text-gray-500 mt-1">Enter the details of your plant product</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              type="text"
              placeholder="Enter plant name"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Select Category</option>
                <option value="vegetable">Vegetable</option>
                <option value="fruit">Fruit</option>
                <option value="grain">Grain</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="relative">
              <input 
                type="number"
                placeholder="Enter quantity"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                kg
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Kg</label>
            <div className="relative">
              <input 
                type="number"
                placeholder="Enter price"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors pl-8"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                ₹
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              type="text"
              placeholder="Enter location"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
            <input 
              type="datetime-local"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors"
              value={formData.deliveryTime}
              onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
            <input 
              type="date"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors"
              value={formData.harvestDate}
              onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shelf Life</label>
            <div className="relative">
              <input 
                type="number"
                placeholder="Enter shelf life"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors"
                value={formData.shelfLife}
                onChange={(e) => setFormData({...formData, shelfLife: e.target.value})}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                days
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            placeholder="Enter plant description..."
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors min-h-[100px] resize-none"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-[#2D775C]/50 transition-colors">
            <input 
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
              required
            />
            <p className="text-sm text-gray-500 mt-2">Upload one or more images of your plant</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2D775C] text-white rounded-xl hover:bg-[#2D775C]/90 font-medium transition-colors"
          >
            Add Plant
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

const Add = () => {
  const [vegDetails, setVagDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchVegDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseUrl}/api/plants/farmer-plants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );
      console.log(response);
      setVagDetails(response.data.Result?.plants || []);
    } catch (e) {
      setError(e.response?.data?.ErrorMessage || "Failed to fetch vegetable details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVegDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${baseUrl}/api/plants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchVegDetails();
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar />

     <div className="p-6 h-[90vh] overflow-y-scroll">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Manage Your Plants</h1>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-[#2D775C] text-white px-6 py-2.5 rounded-xl shadow hover:bg-[#2D775C]/90 transition flex items-center gap-2"
            >
              Add Plant
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div>Loading...</div>
            ) : (
              vegDetails.map((veg) => (
                <div
                  key={veg._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <img
                      src={veg.images[0]}
                      alt={veg.name}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{veg.name}</h3>
                      <div className="flex items-center gap-2 text-[#2D775C]">
                        <MapPin className="h-4 w-4" /> {veg.location}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-semibold text-gray-900">₹{veg.price}/kg</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Available</p>
                        <p className="font-medium text-gray-900">{veg.quantity} kg</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        className="flex-1 bg-[#2D775C] hover:bg-[#2D775C]/90 text-white py-2.5 px-4 rounded-lg transition-colors text-sm font-medium"
                        onClick={() => {/* Handle update */}}
                      >
                        Update
                      </button>
                      <button 
                        className="flex-1 border border-[#2D775C] text-[#2D775C] hover:bg-[#2D775C]/5 py-2.5 px-4 rounded-lg transition-colors text-sm font-medium"
                        onClick={() => setShowDeleteConfirm(veg._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Plant Form */}
      <AddPlantForm showForm={showForm} setShowForm={setShowForm} fetchVegDetails={fetchVegDetails} />

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this plant? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add;