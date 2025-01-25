import React, { useEffect, useState } from "react";
import { X, Plus, Calendar, MapPin, DollarSign } from "lucide-react";
import axios from "axios";

const PlantRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequest] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("token");

  const [newRequest, setNewRequest] = useState({
    plant: "",
    quantity: "",
    requestedPrice: "",
    deliveryLocation: "",
    deliveryDate: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/api/plantsrequest/create/${newRequest.plant}`,
        newRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setShowForm(false);
      console.log("Request submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${baseUrl}/api/plants/farmer-plants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        setPlants(response.data.Result.plants);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${baseUrl}/api/plantsrequest/seller-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setRequest(response.data.Result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Plant Requests</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#2D775C] text-white px-4 py-2 rounded-lg hover:bg-[#2D775C]/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Request
        </button>
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-[#2D775C]/5">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Plant Details
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Delivery Info
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                className="border-b last:border-none hover:bg-gray-50/50"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{request.plant}</p>
                    <p className="text-sm text-[#2D775C]">{request.seller}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{request.quantity}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {request.requestedPrice}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{request.deliveryLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(request.deliveryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${
                      request.status === "pending" &&
                      "bg-yellow-100 text-yellow-800"
                    }
                    ${
                      request.status === "accepted" &&
                      "bg-green-100 text-green-800"
                    }
                    ${
                      request.status === "rejected" && "bg-red-100 text-red-800"
                    }
                    ${
                      request.status === "completed" &&
                      "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${
                      request.isPaymentComplete
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {request.isPaymentComplete ? "Completed" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative">
            <div className="absolute top-0 right-0 p-6">
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Request
              </h2>
              <p className="text-gray-500 mt-1">
                Fill in the details for your new request
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plant Type
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] appearance-none transition-colors"
                      value={newRequest.plant}
                      onChange={(e) =>
                        setNewRequest({ ...newRequest, plant: e.target.value })
                      }
                    >
                      <option value="">Select Plant</option>
                      {plants.map((plant) => (
                        <option key={plant._id} value={plant._id}>
                          {plant.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity Required
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors"
                      placeholder="Enter quantity in kg"
                      value={newRequest.quantity}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          quantity: e.target.value,
                        })
                      }
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                      kg
                    </div>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Kg
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors pl-8"
                      placeholder="Enter price per kg"
                      value={newRequest.requestedPrice}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          requestedPrice: e.target.value,
                        })
                      }
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      ₹
                    </div>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors"
                    value={newRequest.deliveryDate}
                    onChange={(e) =>
                      setNewRequest({
                        ...newRequest,
                        deliveryDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors"
                    placeholder="Enter delivery address"
                    value={newRequest.deliveryLocation}
                    onChange={(e) =>
                      setNewRequest({
                        ...newRequest,
                        deliveryLocation: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C] transition-colors min-h-[100px] resize-none"
                    placeholder="Add any special requirements or notes..."
                    rows={3}
                    value={newRequest.notes}
                    onChange={(e) =>
                      setNewRequest({ ...newRequest, notes: e.target.value })
                    }
                  />
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
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantRequests;
