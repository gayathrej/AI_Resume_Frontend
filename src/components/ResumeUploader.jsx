// src/components/ResumeUploader.jsx

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function ResumeUploader({ onResults }) {
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one resume file!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("resume", file));
    formData.append("email", email);
    formData.append("linkedin_url", linkedin);

    try {
      const response = await axios.post("http://localhost:5001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const backendResults = response.data.results || response.data;
      console.log("📩 Received backend response:", backendResults);

      // ✅ Send results to App.jsx so Dashboard page can render them
      if (onResults) onResults(backendResults);
    } catch (err) {
      console.error("Upload error:", err);
      const message =
        err.response?.data?.error ||
        err.message ||
        "Something went wrong during upload!";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Upload Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4"
      >
        {/* Input Fields */}
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full text-sm"
        />

        <input
          type="url"
          placeholder="LinkedIn URL (optional)"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full text-sm"
        />

        {/* File Upload Area */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 hover:bg-gray-100 transition w-full text-sm">
          <Upload className="text-indigo-500 mb-2" size={28} />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleFileChange}
            className="block text-sm text-gray-600 w-full text-center"
          />
          {files.length > 0 && (
            <p className="text-gray-500 mt-2 text-center">{files.length} file(s) selected</p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <FileText /> Analyze Resume(s)
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}