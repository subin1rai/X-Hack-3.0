import React, { useState, useEffect } from "react";
import { Store, X, Check, X as XIcon } from "lucide-react";
import axios from "axios";

const SellerTable = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogAction, setDialogAction] = useState(null);
  const [toast, setToast] = useState(null);
  const [sellers, setSelllers] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllSellers = async () => {
      const response = await axios.get(`${baseUrl}/api/sellers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });

      setSelllers(response?.data?.Result?.unverifiedSellers);
      console.log(response);
    };
    fetchAllSellers();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAction = (action, sellerId) => {
    if (action === "accept") {
      setToast({
        type: "success",
        message: "Seller verification accepted successfully",
      });
    } else {
      setToast({ type: "error", message: "Seller verification declined" });
    }
    setDialogAction(null);
  };

  return (
    <div className="p-6 relative">
      <div className="rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-[#2D775C]/5">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Shop Details
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                PAN Photo
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr
                key={seller.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D775C]/10">
                      <Store className="h-5 w-5 text-[#2D775C]" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {seller.shopName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {seller.ownerName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{seller.email}</td>
                <td className="px-6 py-4 text-gray-600">{seller.location}</td>
                <td className="px-6 py-4 text-gray-600">{seller.contact}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-[#2D775C] hover:text-[#2D775C]/80 font-medium"
                    onClick={() => setSelectedImage(seller.panImage)}
                  >
                    View PAN
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setDialogAction({ type: "accept", id: seller.id })
                      }
                      className="p-1.5 hover:bg-[#2D775C]/10 rounded-full text-[#2D775C] transition-colors"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setDialogAction({ type: "decline", id: seller.id })
                      }
                      className="p-1.5 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white transition-all transform translate-y-0 ${
            toast.type === "success" ? "bg-[#2D775C]" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Custom Dialog */}
      {dialogAction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-2">
              {dialogAction.type === "accept"
                ? "Accept Seller Verification"
                : "Decline Seller Verification"}
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to {dialogAction.type} this seller's
              verification? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDialogAction(null)}
                className="px-4 py-2 rounded-md border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(dialogAction.type, dialogAction.id)}
                className={`px-4 py-2 rounded-md text-white ${
                  dialogAction.type === "accept"
                    ? "bg-[#2D775C] hover:bg-[#2D775C]/90"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {dialogAction.type === "accept" ? "Accept" : "Decline"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
            <button
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
            <div className="aspect-video relative mt-2">
              <img
                src={selectedImage}
                alt="PAN Card"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerTable;
