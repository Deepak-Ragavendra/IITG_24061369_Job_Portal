import React, { useEffect, useState } from "react";
import axios from "axios";

function ApplicationList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/applications")
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Job Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Candidate Name</th>
              <th>Candidate Email</th>
              <th>Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app.jobId?.jobTitle || "N/A"}</td>
                <td>{app.candidateId?.name || "N/A"}</td>
                <td>{app.candidateId?.email || "N/A"}</td>
                <td>{new Date(app.appliedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApplicationList;
