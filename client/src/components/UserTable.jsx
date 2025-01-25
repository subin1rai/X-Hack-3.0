import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, User2, X } from "lucide-react";

const UserTable = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const menuRef = useRef(null);
  const [users] = useState([
    {
      id: 1,
      name: "Robert Fox",
      email: "robert@gmail.com",
      role: "Admin",
      businessName: "Fox Trading Co.",
      image: "/api/placeholder/40/40",
      panPhoto: "/api/placeholder/400/300",
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6">
      <div className="rounded-2xl bg-white shadow-sm">
        <table className="w-full rounded-2xl">
          <thead className="rounded-2xl">
            <tr className="bg-[#2D775C]/10 rounded-2xl">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Business Name
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
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-[#2D775C]/20"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D775C]/10">
                        <User2 className="h-5 w-5 text-[#2D775C]" />
                      </div>
                    )}
                    <span className="font-medium text-gray-900">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#2D775C]/10 text-[#2D775C]">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.businessName}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-[#2D775C] hover:text-[#2D775C]/80 font-medium"
                    onClick={() => setSelectedImage(user.panPhoto)}
                  >
                    View PAN
                  </button>
                </td>
                <td className="px-6 py-4 relative" ref={menuRef}>
                  <button
                    onClick={() =>
                      setIsMenuOpen(isMenuOpen === user.id ? null : user.id)
                    }
                    className="p-1.5 hover:bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                  {isMenuOpen === user.id && (
                    <div className="absolute right-8 mt-2 w-48 rounded-xl shadow-lg bg-white py-2 z-10">
                      <button
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors"
                        onClick={() => {
                          console.log("Deactivate:", user.id);
                          setIsMenuOpen(null);
                        }}
                      >
                        Deactivate User
                      </button>
                      <button
                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 text-left transition-colors"
                        onClick={() => {
                          console.log("Remove:", user.id);
                          setIsMenuOpen(null);
                        }}
                      >
                        Remove User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default UserTable;
