import React, { useState } from 'react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addJob = () => {
    if(title && description){
      setJobs([...jobs, { title, description }]);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div>
      <h1>Manage Job Posts</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Job Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Job Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addJob}>Add Job</button>
      </div>

      {jobs.map((job, idx) => (
        <div key={idx} className="card">
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Jobs;