import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    education: "",
    experience: ""
  });

  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    const res = await axios.get("http://localhost:5000/api/candidates");
    setCandidates(res.data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/candidates", formData);
    setFormData({ name: "", email: "", skills: "", education: "", experience: "" });
    fetchCandidates();
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#f5f5f5",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "500px"
      }}>
        <h2 style={{ textAlign: "center" }}>Add Candidate</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} />
          <input name="education" placeholder="Education" value={formData.education} onChange={handleChange} />
          <input name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
          <button type="submit" style={{ backgroundColor: "#4CAF50", color: "#fff", padding: "10px", border: "none", borderRadius: "5px" }}>Submit</button>
        </form>
      </div>

      <div style={{ marginTop: "40px", width: "100%", maxWidth: "500px", textAlign: "center" }}>
        <h3>All Candidates</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {candidates.map((c) => (
            <li key={c._id} style={{
              backgroundColor: "#fff",
              margin: "10px 0",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              textAlign: "left"
            }}>
              <strong>{c.name}</strong><br />
              Email: {c.email}<br />
              Skills: {c.skills}<br />
              Education: {c.education}<br />
              Experience: {c.experience}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CandidateForm;
