import React, { useState } from "react";

export default function HRInput({ onSubmit }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobTitle || !jobDesc) return alert("Fill in all fields");
    onSubmit({ jobTitle, jobDesc });
  };

  return (
    <div className="hr-input-page glass-card">
      <h2>Post a New Job Vacancy</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title</label>
        <input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title"
        />
        <label>Job Description</label>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste job description here"
        />
        <button type="submit">Submit Job</button>
      </form>
    </div>
  );
}
