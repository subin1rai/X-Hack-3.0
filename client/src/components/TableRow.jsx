// TableRow.jsx
import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Edit2,
  Save,
  X,
  MoreVertical,
  Trash2,
} from "lucide-react";

const TableRow = ({ request, onSave, onDelete, isEditing, setIsEditing }) => {
  const [editedData, setEditedData] = useState(request);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    setEditedData(request);
  }, [request]);

  const handleSave = async () => {
    await onSave(editedData);
    setIsEditing(false);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".action-menu")) {
      setShowActions(false);
    }
  };

  useEffect(() => {
    if (showActions) {
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [showActions]);

  if (isEditing) {
    return (
      <tr className="border-b last:border-none hover:bg-gray-50/50 transition-colors">
        <td className="px-6 py-4">
          <input
            type="text"
            value={editedData.plantId.name}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                plantId: { ...editedData.plantId, name: e.target.value },
              })
            }
            className="w-full p-2 border rounded-lg"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={editedData.quantity}
            onChange={(e) =>
              setEditedData({ ...editedData, quantity: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={editedData.requestedPrice}
            onChange={(e) =>
              setEditedData({ ...editedData, requestedPrice: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
          />
        </td>
        <td className="px-6 py-4">
          <div className="space-y-2">
            <input
              type="text"
              value={editedData.deliveryLocation}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  deliveryLocation: e.target.value,
                })
              }
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="date"
              value={editedData.deliveryDate.split("T")[0]}
              onChange={(e) =>
                setEditedData({ ...editedData, deliveryDate: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <select
            value={editedData.status}
            onChange={(e) =>
              setEditedData({ ...editedData, status: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Save"
            >
              <Save className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Cancel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b last:border-none hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{request?.plantId?.name}</p>
          <p className="text-sm text-[#2D775C]">{request.seller}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-600 font-medium">{request.quantity} kg</span>
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
            <span>{new Date(request.deliveryDate).toLocaleDateString()}</span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5
          ${request.status === "pending" && "bg-yellow-100 text-yellow-800"}
          ${request.status === "accepted" && "bg-green-100 text-green-800"}
          ${request.status === "rejected" && "bg-red-100 text-red-800"}
          ${request.status === "completed" && "bg-blue-100 text-blue-800"}`}
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
      <td className="px-6 py-4 relative">
        <div className="flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors action-menu"
            title="More actions"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10 action-menu">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowActions(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(request._id);
                  setShowActions(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 flex items-center gap-2 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
