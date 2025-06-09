import React, { useState } from "react";
import axios from "axios";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    education: "",
    experience: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/candidates", formData);
      setMessage("Candidate registered successfully!");
      setFormData({
        name: "",
        email: "",
        skills: "",
        education: "",
        experience: ""
      });
    } catch (err) {
      setMessage("Error registering candidate.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register Candidate</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <input name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} /><br />
        <input name="education" placeholder="Education" value={formData.education} onChange={handleChange} /><br />
        <input name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CandidateForm;
