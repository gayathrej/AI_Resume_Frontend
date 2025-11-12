import React, { useState, useEffect } from "react";
import "./App.css";
import "./pages/Dashboard.css";   // correct path to CSS
import Dashboard from "./pages/Dashboard";  // correct path to component
import ResumeUploader from "./components/ResumeUploader";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [topSkills, setTopSkills] = useState("");
  const [suggestedKeywords, setSuggestedKeywords] = useState("");
  const [mandatoryReqs, setMandatoryReqs] = useState("");
  const [isoModalOpen, setIsoModalOpen] = useState(false);
  const [resumeResults, setResumeResults] = useState([]);
  const [currentPage, setCurrentPage] = useState("hrInput"); // "hrInput" or "dashboard"
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
    // Ensure every result has a numeric score for dashboard graphs
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

  return (
    <div className="app">
      <video autoPlay loop muted className="bg-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Header + Navigation */}
      <header className="app-header glass-card">
        <h1>AI Resume Checker</h1>
        <div className="nav-buttons">
          <button
            className={currentPage === "hrInput" ? "active" : ""}
            onClick={() => setCurrentPage("hrInput")}
          >
            HR Input
          </button>
          <button
            className={currentPage === "dashboard" ? "active" : ""}
            onClick={() => setCurrentPage("dashboard")}
          >
            Dashboard
          </button>
          <button className="iso-btn" onClick={() => setIsoModalOpen(true)}>
            ISO Compliance
          </button>
        </div>
      </header>

      <main className="app-main">
        {currentPage === "hrInput" && (
          <>
            <div className="flex-row">
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

              <section className="panel job-insights-panel glass-card">
                <h2>Job Insights</h2>
                <label>Top skills:</label>
                <input value={topSkills} readOnly />
                <label>Suggested keywords:</label>
                <input value={suggestedKeywords} readOnly />
                <label>Mandatory Requirements:</label>
                <input value={mandatoryReqs} readOnly />
              </section>
            </div>

            <section className="panel upload-panel glass-card">
              <h2>Upload Resumes & LinkedIn</h2>
              <div className="flex-row">
                <div className="flex-column">
                  <label>Upload Resumes</label>
                  <ResumeUploader
                    linkedinUrl={linkedinUrl}
                    onResults={handleUploadResults}
                    setLoading={setLoading}
                  />
                  {loading && <p>Analyzing resumes, please wait...</p>}
                </div>
              </div>
            </section>
          </>
        )}

        {currentPage === "dashboard" && (
          <section className="panel dashboard-panel glass-card">
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">
              📊 Resume Analysis Dashboard
            </h1>
            {resumeResults?.length > 0 ? (
              <Dashboard candidates={resumeResults} />
            ) : (
              <p>No results to display yet. Upload resumes first.</p>
            )}
          </section>
        )}
      </main>

      <footer className="app-footer glass-card">Made by Gayathre J</footer>

      {/* ISO Modal */}
      {isoModalOpen && (
        <div className="modal-overlay" onClick={() => setIsoModalOpen(false)}>
          <div
            className="modal-content glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>ISO Compliance Overview</h2>
            <p>
              The AI Resume Checker platform ensures adherence to global
              standards for security and responsible AI.
            </p>
            <details open>
              <summary>ISO 27001 — InfoSec Management</summary>
              <ul>
                <li>End-to-end encryption of candidate and HR data (AES-256)</li>
                <li>Restricted access to authorized HR personnel only</li>
                <li>Audit logs for every resume interaction</li>
              </ul>
            </details>
            <details>
              <summary>ISO 42001 — AI Governance</summary>
              <ul>
                <li>Transparent AI scoring</li>
                <li>Bias detection & mitigation</li>
                <li>Human oversight in evaluation</li>
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