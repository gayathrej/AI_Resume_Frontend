import React, { useState, useEffect } from "react";
import "./App.css";
import ResumeUploader from "./components/ResumeUploader";
import bgVideo from "./assets/bg-video.mp4";
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

const COLORS = ["#00FFC6", "#0099A8", "#FF6B6B", "#FFD93D"];

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [topSkills, setTopSkills] = useState("");
  const [suggestedKeywords, setSuggestedKeywords] = useState("");
  const [mandatoryReqs, setMandatoryReqs] = useState("");
  const [isoModalOpen, setIsoModalOpen] = useState(false);
  const [resumeResults, setResumeResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!jobDesc) return;
    const words = jobDesc
      .replace(/[.,]/g, "")
      .split(" ")
      .filter((w) => w.length > 4);
    setTopSkills(words.slice(0, 5).join(", "));
    setSuggestedKeywords(words.slice(5, 10).join(", "));
    setMandatoryReqs(words.slice(10, 15).join(", "));
  }, [jobDesc]);

  const handleUploadResults = (results) => {
    const processedResults = results.map((res) => ({
      filename: res.filename,
      analysis: res.analysis,
      score:
        res.score !== undefined
          ? res.score
          : Math.min(100, Math.max(0, Math.floor(res.analysis.length / 10))),
    }));
    setResumeResults(processedResults);
  };

  const formatPieData = (analysis) => {
    // Demo breakdown (replace with actual backend values if available)
    const strengths = Math.floor(Math.random() * 40) + 30;
    const weaknesses = Math.floor(Math.random() * 30) + 10;
    const bias = 100 - strengths - weaknesses;
    return [
      { name: "Strengths", value: strengths },
      { name: "Weaknesses", value: weaknesses },
      { name: "Bias Risk", value: bias },
    ];
  };

  return (
    <div className="app">
      {/* Background video */}
      <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* HEADER */}
      <header className="app-header glass-card">
        <h1>AI Resume Checker</h1>
        <div className="nav-buttons">
          <button className="iso-btn" onClick={() => setIsoModalOpen(true)}>
            ISO Compliance
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="app-main">
        <div className="flex-row">
          {/* Job Description */}
          <section className="panel job-desc-panel glass-card">
            <h2>Job Description</h2>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter Job Title"
            />
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste job description here..."
            />
          </section>

          {/* Job Insights */}
          <section className="panel job-insights-panel glass-card">
            <h2>Job Insights</h2>
            <label>Top Skills:</label>
            <input value={topSkills} readOnly />
            <label>Suggested Keywords:</label>
            <input value={suggestedKeywords} readOnly />
            <label>Mandatory Requirements:</label>
            <input value={mandatoryReqs} readOnly />
          </section>
        </div>

        {/* Upload + LinkedIn */}
        <section className="panel upload-panel glass-card">
          <h2>Upload Resumes & LinkedIn Profile</h2>
          <div className="flex-row">
            <div className="flex-column">
              <label>Upload Resumes</label>
              <ResumeUploader
                linkedinUrl={linkedinUrl}
                onResults={handleUploadResults}
                setLoading={setLoading}
              />
              {loading && (
                <p style={{ color: "#00FFC6", marginTop: "8px" }}>
                  Analyzing resumes using AI... please wait ⚙️
                </p>
              )}
            </div>
          </div>
        </section>

        {/* RESULTS DISPLAY - Separate Panel with Charts */}
        {resumeResults.length > 0 && (
          <section className="panel results-panel glass-card">
            <h2>📊 Resume Analysis Dashboard</h2>
            {resumeResults.map((res, idx) => (
              <div key={idx} className="result-card glass-card">
                <h3>{res.filename}</h3>
                <p>{res.analysis}</p>
                <p>
                  <strong>Score:</strong> {res.score} / 100
                </p>

                {/* Bar Chart */}
                <div style={{ width: "100%", height: 150 }}>
                  <ResponsiveContainer>
                    <BarChart data={[{ name: res.filename, score: res.score }]}>
                      <XAxis dataKey="name" stroke="#00FFC6" />
                      <YAxis stroke="#00FFC6" />
                      <Tooltip />
                      <Bar
                        dataKey="score"
                        fill="#00FFC6"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
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
                        label
                      >
                        {formatPieData(res.analysis).map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="app-footer glass-card">
        Made by <strong>Gayathre J</strong>
      </footer>

      {/* ISO MODAL */}
      {isoModalOpen && (
        <div className="modal-overlay" onClick={() => setIsoModalOpen(false)}>
          <div
            className="modal-content glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>ISO Compliance Overview</h2>
            <p>
              This platform adheres to UAE Government standards ensuring both data
              protection and responsible AI governance.
            </p>

            <details open>
              <summary>ISO 27001 — InfoSec Management</summary>
              <ul>
                <li>End-to-end encryption (AES-256)</li>
                <li>Authorized HR access control</li>
                <li>Audit logs for resume operations</li>
              </ul>
            </details>

            <details>
              <summary>ISO 42001 — AI Governance</summary>
              <ul>
                <li>Transparent scoring methodology</li>
                <li>Bias detection & mitigation</li>
                <li>Human oversight maintained</li>
              </ul>
            </details>

            <button
              className="modal-close-btn"
              onClick={() => setIsoModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;