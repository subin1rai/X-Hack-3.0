import React from "react";
import { X } from "lucide-react";

const RequestForm = ({
  showForm,
  setShowForm,
  newRequest,
  setNewRequest,
  handleSubmit,
  plants,
}) => {
  return (
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
          <h2 className="text-2xl font-bold text-gray-900">Add New Request</h2>
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
                    setNewRequest({ ...newRequest, quantity: e.target.value })
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
                  setNewRequest({ ...newRequest, deliveryDate: e.target.value })
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
  );
};

export default RequestForm;
