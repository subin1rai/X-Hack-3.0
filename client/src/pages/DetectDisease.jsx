
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import images from "../constants/images";

const LoadingAnimation = () => (
  <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">
    <div className="relative flex flex-col items-center">
      <div className="w-20 h-20 border-4 border-t-[#2D775C] border-opacity-20 rounded-full animate-spin"></div>
      <div className="w-16 h-16 absolute border-4 border-t-[#2D775C] border-opacity-40 rounded-full animate-spin-slow"></div>
      <div className="absolute">
        <div className="h-40 w-40 border-2 border-[#2D775C] rounded-full animate-ping"></div>
      </div>
      <p className="text-white mt-8 text-lg font-medium animate-pulse">
        Analyzing Image...
      </p>
    </div>
  </div>
);

const DetectDisease = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSpline, setShowSpline] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingAIText, setTypingAIText] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setPrediction("");
      setAiResponse("");
      setTypingText("");
      setTypingAIText("");
    }
  };

  const typeText = async (text, setterFunction, speed = 20) => {
    let currentText = "";
    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, speed));
      currentText += text[i];
      setterFunction(currentText);

      const resultsDiv = document.querySelector(".results-container");
      if (resultsDiv) {
        resultsDiv.scrollTop = resultsDiv.scrollHeight;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    setShowSpline(true);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setShowSpline(false);

      if (data.prediction) {
        setPrediction(data.prediction);
        await typeText(data.prediction, setTypingText, 50);
        await fetchAIInfo(data.prediction);
      }
    } catch (error) {
      console.error(error);
      setPrediction("Error occurred while predicting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAIInfo = async (diseaseName) => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyABzKGpBrq5xQmiKMZgwuj_A96c1XIIw6o",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Please provide the name of the plant and precautions for the disease: ${diseaseName}. Give me in a format like: Plant Name: nameofPlant \nCaused By:... \n Precautions:`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts) {
        const text = data.candidates[0].content.parts[0].text;
        setAiResponse(text);
        await typeText(text, setTypingAIText, 50);
      }
    } catch (error) {
      setAiResponse("Error fetching disease information.");
    }
  };

  return (
    <div className="flex gap-1 bg-gray-50 transition-all duration-300">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />

        {showSpline && <LoadingAnimation />}

        <div
          className={`flex h-[90vh] w-[85vw] items-center transition-all duration-300 ${
            typingText || typingAIText ? "blur-sm" : ""
          }`}
        >
          <div className="flex flex-col w-[50%] justify-center items-center">
            <h2 className="font-bold text-4xl bg-gradient-to-r from-[#2D775C] to-green-500 text-transparent bg-clip-text">
              Detect Diseases Now!
            </h2>
            <img src={images.detect} className="h-[70%] w-[70%]" alt="" />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex bg-white rounded-2xl h-[600px] w-[600px] shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
              <div className="relative w-[550px] h-[550px]">
                {/* Corners with animation */}
                <div className="absolute top-4 left-4 w-14 h-14 border-t-[10px] border-l-[10px] border-gray-200 rounded-tl-xl animate-pulse"></div>
                <div className="absolute top-4 right-4 w-14 h-14 border-t-[10px] border-r-[10px] border-gray-200 rounded-tr-xl animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-14 h-14 border-b-[10px] border-l-[10px] border-gray-200 rounded-bl-xl animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 border-b-[10px] border-r-[10px] border-gray-200 rounded-br-xl animate-pulse"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center m-20">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                    onChange={handleImageChange}
                  />
                  {previewImage ? (
                    <div className="flex justify-center items-center w-full h-full flex-col">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        onClick={() =>
                          document.getElementById("imageUpload").click()
                        }
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-[#2D775C] px-8 py-3 text-white font-xl font-medium mt-6 rounded-xl hover:bg-[#2D775C]/90 disabled:opacity-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                      >
                        {loading ? "Processing..." : "Submit"}
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer flex flex-col items-center transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4 hover:bg-gray-200 transition-colors">
                        <img
                          src={images.addImage}
                          className="h-[350px] w-[350px]"
                          alt=""
                        />
                      </div>
                      <p className="text-gray-500 text-center">
                        Click to upload image
                        <br />
                        <span className="text-sm">or drag and drop</span>
                      </p>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {(typingText || typingAIText) && (
          <div className="fixed inset-0 flex items-center justify-center px-4 bg-black/30 backdrop-blur-md">
            <div className="bg-white/95 w-full  max-w-3xl rounded-xl shadow-2xl p-8 animate-slideUp results-container overflow-y-auto max-h-[80vh]">
              {typingText && (
                <div className="mb-6 border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#2D775C] animate-pulse"></div>
                    <h3 className="font-semibold text-lg">Disease Detected</h3>
                  </div>
                  <div className="bg-[#2D775C]/5 rounded-lg p-4">
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {typingText}
                    </p>
                  </div>
                </div>
              )}
              {typingAIText && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#2D775C] animate-pulse"></div>
                    <h3 className="font-semibold text-lg">Detailed Analysis</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="prose prose-lg max-w-none">
                      {typingAIText.split("\n").map((line, i) => {
                        if (line.startsWith("Plant Name:")) {
                          return (
                            <h4
                              key={i}
                              className="text-[#2D775C] font-medium text-lg mb-2"
                            >
                              {line}
                            </h4>
                          );
                        }
                        if (line.startsWith("Caused By:")) {
                          return (
                            <div key={i} className="mb-4">
                              <h4 className="font-medium mb-2">Cause</h4>
                              <p className="text-gray-700">
                                {line.replace("Caused By:", "")}
                              </p>
                            </div>
                          );
                        }
                        if (line.startsWith("Precautions:")) {
                          return (
                            <div key={i} className="mb-4">
                              <h4 className="font-medium mb-2">Precautions</h4>
                              <p className="text-gray-700">
                                {line.replace("Precautions:", "")}
                              </p>
                            </div>
                          );
                        }
                        return (
                          <p key={i} className="text-gray-700 mb-4">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectDisease;
