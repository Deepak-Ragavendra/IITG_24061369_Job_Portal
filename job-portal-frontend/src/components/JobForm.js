import React, { useState } from "react";
import axios from "axios";

const JobForm = ({ onJobAdded }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !company || !location) {
      alert("Please fill in all required fields (title, company, location)");
      return;
    }

    try {
      const newJob = { title, company, location, description, requirements, salary };
      const res = await axios.post("http://localhost:5000/api/jobs", newJob);
      alert("Job posted successfully!");
      onJobAdded(res.data); // notify parent to update list

      // Clear form fields
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setRequirements("");
      setSalary("");
    } catch (error) {
      console.error("Failed to post job:", error);
      alert("Failed to post job");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "20px auto", padding: "15px", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h3>Post a New Job</h3>

      <label>Job Title *</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

      <label>Company *</label>
      <input type="text" value={company} onChange={e => setCompany(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

      <label>Location *</label>
      <input type="text" value={location} onChange={e => setLocation(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

      <label>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

      <label>Requirements</label>
      <textarea value={requirements} onChange={e => setRequirements(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

      <label>Salary</label>
      <input type="text" value={salary} onChange={e => setSalary(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

      <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#5cb85c", color: "white", border: "none", cursor: "pointer" }}>Post Job</button>
    </form>
  );
};

export default JobForm;
