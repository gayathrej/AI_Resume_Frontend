// src/pages/Dashboard.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Award, TrendingUp, FileText } from "lucide-react";

export default function Dashboard({ results = [] }) {
  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <FileText className="mb-3" size={40} />
        <p>No analysis data available. Please upload resumes first.</p>
      </div>
    );
  }

  // Transform data for charts
  const barData = results.map((res) => ({
    name: res.filename || "Resume",
    score: res.score || 0,
  }));

  const avgScore =
    results.reduce((sum, res) => sum + (res.score || 0), 0) / results.length;

  const pieData = [
    { name: "Excellent (>75%)", value: results.filter((r) => r.score > 75).length },
    { name: "Average (50-75%)", value: results.filter((r) => r.score >= 50 && r.score <= 75).length },
    { name: "Needs Improvement (<50%)", value: results.filter((r) => r.score < 50).length },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border">
            <TrendingUp className="text-indigo-500 mb-2" size={32} />
            <h2 className="text-base md:text-lg font-semibold">Average Score</h2>
            <p className="text-2xl md:text-3xl font-bold text-indigo-600">
              {avgScore.toFixed(1)}%
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border">
            <Award className="text-green-500 mb-2" size={32} />
            <h2 className="text-base md:text-lg font-semibold">Top Performer</h2>
            <p className="text-lg md:text-xl font-medium text-green-600">
              {results.reduce((a, b) => (a.score > b.score ? a : b)).filename}
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border">
            <FileText className="text-yellow-500 mb-2" size={32} />
            <h2 className="text-base md:text-lg font-semibold">Total Resumes</h2>
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">{results.length}</p>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Bar Chart */}
          <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-2xl shadow-lg p-6 border">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 text-center">Resume Scores Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-2xl shadow-lg p-6 border">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 text-center">Score Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Detailed Resume Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((res, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }} className="bg-white p-5 rounded-2xl shadow border">
              <h3 className="font-semibold text-indigo-600 text-lg mb-2">{res.filename}</h3>
              <p className="text-sm mb-2">
                Score:{" "}
                <span
                  className={`font-bold ${
                    res.score > 75
                      ? "text-green-600"
                      : res.score > 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {res.score}%
                </span>
              </p>
              <div className="text-sm text-gray-600 prose max-w-none" dangerouslySetInnerHTML={{ __html: res.analysis_html || res.analysis }} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}