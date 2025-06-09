import React, { useState, useEffect } from "react";
import axios from "axios";

const JobList = ({refreshFlag}) => {
  const [jobs, setJobs] = useState([]);

  // Fetch job listings from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then(response => setJobs(response.data))
      .catch(error => console.error("Error fetching jobs:", error));
  }, [refreshFlag]);

  // Delete job by ID
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${id}`);
        alert("Job deleted successfully!");
        setJobs(jobs.filter(job => job._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete job");
      }
    }
  };

  // Edit job title (simple prompt edit)
  const handleEdit = async (job) => {
    const newTitle = prompt("Enter new job title:", job.title);
    if (!newTitle || newTitle === job.title) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/jobs/${job._id}`, {
        ...job,
        title: newTitle,
      });
      setJobs(jobs.map(j => (j._id === job._id ? res.data : j)));
      alert("Job updated successfully!");
    } catch (error) {
      console.error("Edit failed:", error);
      alert("Failed to update job");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Job Listings</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px", borderRadius: "5px" }}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary || "Not specified"}</p>
            <p>{job.description}</p>
            <div>
              <button
                onClick={() => handleDelete(job._id)}
                style={{ backgroundColor: "#d9534f", color: "white", border: "none", padding: "8px 12px", cursor: "pointer", borderRadius: "3px" }}
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(job)}
                style={{ backgroundColor: "#0275d8", color: "white", border: "none", padding: "8px 12px", marginLeft: "10px", cursor: "pointer", borderRadius: "3px" }}
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
