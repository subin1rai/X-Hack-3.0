import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import images from "../constants/images";
import axios from "axios";

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black "
        style={{ opacity: 0.5 }}
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-2xl rounded-lg bg-white p-6">
        {children}
      </div>
    </div>
  );
};

// Create Blog Post Component
const CreateBlogPost = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // Handle Image Removal
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Cleanup URLs on Unmount
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("tags", formData.tags);

    formData.images.forEach((file) => {
      formDataToSend.append("images", file);
    });

    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/blogs/create`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.IsSuccess) {
        console.log("Blog Created:", response.data);
        onClose();
      } else {
        setError(response.data.ErrorMessage[0]?.message || "Failed to create the blog.");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.ErrorMessage[0]?.message || "Internal server error.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${baseUrl}/api/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      console.log(response);
      setPost(response.data.Result || []); 
      setError("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.ErrorMessage[0]?.message || "Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 rounded-full p-2 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold">Create New Blog Post</h2>

        {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter an engaging title"
              className="w-full rounded-lg border border-gray-300 p-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              placeholder="Write your blog content..."
              rows="6"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              placeholder="Enter tags separated by commas (e.g., tech, programming)"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <div className="space-y-4">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-3 hover:bg-gray-50">
                <Upload className="h-5 w-5" />
                <span>Upload Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-full rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-6 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// Blog Post Component
const BlogPost = ({ title, author, date, tags, image }) => (
  <div className="bg-gray-200 h-[520px] w-[400px] rounded-2xl border-1 border-gray-100">
    <div>
      <h1 className="text-2xl font-bold px-4 pt-4">{title}</h1>
      <p className="pl-4 pt-1">by {author}</p>
      <div className="flex gap-4 pl-4 pt-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="p-1 border-2 rounded-xl px-2 border-gray-500"
          >
            <p>#{tag}</p>
          </div>
        ))}
      </div>
      <p className="pl-4 pt-2">{date}</p>
      <div className="p-4">
        <img src={image} className="rounded-2xl" alt="Post" />
      </div>
      <div className="px-4">
        <hr className="border-t-2 border-gray-400" />
      </div>
    </div>
    <div className="flex justify-center items-center gap-4 pt-4">
      <img src={images.comment} alt="" className="w-[24px] h-[24px]" />
      <p>
        <span>12</span> Comment
      </p>
    </div>
  </div>
);

// Main Community Component
const Community = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const blogPosts = [
    {
      title: "Computer Science Papers Every Developer Should Read",
      author: "Susan Rai",
      date: "Jan 16",
      tags: ["IIC", "Heroes", "Winner"],
      image: images.farmerMan,
    },
    {
      title: "Top 10 Farming Techniques fsfsdfd sdfs d",
      author: "John Doe",
      date: "Jan 25",
      tags: ["Farming", "Techniques"],
      image: images.farmerMan,
    },
  ];

  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <h1 className="text-3xl p-6 font-bold flex justify-center">
          AnnaTripti Community
        </h1>

        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="mx-6 w-fit mb-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 self-end"
        >
          Create Post
        </button>

        <CreateBlogPost
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
        />

        <div className="flex gap-4 justify-center flex-wrap">
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
