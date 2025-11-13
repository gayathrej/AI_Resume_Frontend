import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BACKEND_URL = "https://ai-resume-backend-2eif.onrender.com";
const COLORS = ["#00FFC6", "#0099A8", "#FF6B6B", "#FFD93D"];

export default function ResumeUploader() {
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => setFiles([...e.target.files]);

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one resume file!");
      return;
    }
    setError("");
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("resume", file));
    formData.append("email", email);
    formData.append("linkedin_url", linkedin);

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const backendResults = response.data || [];
      setResults(backendResults);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const formatPieData = (analysis) => {
    return [
      { name: "Strengths", value: Math.floor(Math.random() * 40) + 30 },
      { name: "Weaknesses", value: Math.floor(Math.random() * 30) + 10 },
      {
        name: "Bias Risk",
        value:
          100 -
          (Math.floor(Math.random() * 40) + 30) -
          (Math.floor(Math.random() * 30) + 10),
      },
    ];
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-xl w-full max-w-3xl p-6 flex flex-col gap-6"
      >
        <h2 className="text-xl font-bold text-cyan-400">Upload Resume</h2>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-600 bg-black/30 placeholder-gray-400"
          />
          <input
            type="url"
            placeholder="LinkedIn URL (optional)"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="p-3 rounded-lg border border-gray-600 bg-black/30 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-2xl p-6 hover:bg-gray-700/40 transition w-full text-center gap-2">
          <Upload size={32} className="text-cyan-400" />
          <p>Drag & drop or select resume files (PDF/DOC/DOCX)</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleFileChange}
            className="block mt-2 w-full text-sm text-gray-300"
          />
          {files.length > 0 && <p className="mt-2">{files.length} file(s) selected</p>}
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-bold flex justify-center items-center gap-2 transition"
        >
          {loading ? <Loader2 className="animate-spin" /> : <FileText />} Analyze Resume(s)
        </button>
        {error && <p className="text-red-400 font-semibold">{error}</p>}
      </motion.div>

      {/* Analysis Section */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-xl w-full max-w-5xl p-6 mt-8 flex flex-col gap-6"
        >
          <h2 className="text-xl font-bold text-cyan-400 mb-4">
            📊 Resume Analysis Dashboard
          </h2>
          {results.map((res, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-black/30 backdrop-blur-lg rounded-2xl p-4 flex flex-col gap-4"
            >
              <p className="text-lg font-bold text-cyan-400">📄 {res.filename}</p>
              <p className="text-sm whitespace-pre-line">{res.analysis}</p>
              <p className="font-semibold mt-2">Score: {res.score}</p>

              {/* Bar Chart for score */}
              <div style={{ width: "100%", height: 150 }}>
                <ResponsiveContainer>
                  <BarChart data={[{ name: res.filename, score: res.score }]}>
                    <XAxis dataKey="name" stroke="#00FFC6" />
                    <YAxis stroke="#00FFC6" />
                    <Tooltip />
                    <Bar dataKey="score" fill="#00FFC6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie chart for demo breakdown */}
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={formatPieData(res.analysis)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      label
                    >
                      {formatPieData(res.analysis).map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}