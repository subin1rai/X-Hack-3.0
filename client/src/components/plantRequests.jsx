import React, { useEffect, useState, useCallback } from "react";
import {
  X,
  Plus,
  Calendar,
  MapPin,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  Edit2,
  Eye,
  Trash2,
} from "lucide-react";
import axios from "axios";
import RequestForm from "./AddPlantRequest";
import { ToastContainer } from "./Toast";

const PlantRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const [plants, setPlants] = useState([]);

  const [newRequest, setNewRequest] = useState({
    plant: "",
    quantity: "",
    requestedPrice: "",
    deliveryLocation: "",
    deliveryDate: "",
    notes: "",
  });

  console.log(newRequest);

  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const fetchRequests = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/plantsrequest/seller-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setRequests(response?.data?.Result?.requests || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [baseUrl, token]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequests();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
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
      addToast("Request submitted successfully!", "success");
      handleRefresh();
      setNewRequest({
        plant: "",
        quantity: "",
        requestedPrice: "",
        deliveryLocation: "",
        deliveryDate: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/plants/getAllPlants`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setPlants(response.data.Result.plants);
        console.log(plants);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
    fetchRequests();
  }, [fetchRequests]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requests?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((requests?.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2D775C]" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 h-[90vh]">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Plant Requests</h1>
            <p className="mt-1 text-gray-500">
              Manage and track your plant requests
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
              disabled={refreshing}
            >
              <RefreshCw
                className={`h-5 w-5 ${refreshing && "animate-spin"}`}
              />
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-[#2D775C] text-white px-4 py-2 rounded-lg hover:bg-[#2D775C]/90 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Request
            </button>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No requests found
              </h3>
              <p className="text-gray-500 mb-4">
                Start by creating a new plant request.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-[#2D775C] text-white px-4 py-2 rounded-lg hover:bg-[#2D775C]/90 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Create Request
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
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
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((request) => (
                    <tr
                      key={request._id}
                      className="border-b last:border-none hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {request?.plantId?.name}
                          </p>
                          <p className="text-sm text-[#2D775C]">
                            {request.seller}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 font-medium">
                          {request.quantity} kg
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">
                          ₹{request.requestedPrice}/kg
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{request.deliveryLocation}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                request.deliveryDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5
                          ${
                            request.status === "pending" &&
                            "bg-yellow-100 text-yellow-800"
                          }
                          ${
                            request.status === "accepted" &&
                            "bg-green-100 text-green-800"
                          }
                          ${
                            request.status === "rejected" &&
                            "bg-red-100 text-red-800"
                          }
                          ${
                            request.status === "completed" &&
                            "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              request.status === "pending"
                                ? "bg-yellow-500"
                                : request.status === "accepted"
                                ? "bg-green-500"
                                : request.status === "rejected"
                                ? "bg-red-500"
                                : "bg-blue-500"
                            }`}
                          ></span>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5
                          ${
                            request.isPaymentComplete
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              request.isPaymentComplete
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          ></span>
                          {request.isPaymentComplete ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {requests.length > itemsPerPage && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, requests.length)} of{" "}
                  {requests.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-[#2D775C] text-white"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <RequestForm
          showForm={showForm}
          setShowForm={setShowForm}
          newRequest={newRequest}
          setNewRequest={setNewRequest}
          handleSubmit={handleSubmit}
          plants={plants}
        />
      )}
    </div>
  );
};

export default PlantRequests;
