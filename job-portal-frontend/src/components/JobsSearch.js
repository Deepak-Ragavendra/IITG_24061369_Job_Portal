import React, { useState, useEffect } from "react";
import axios from "axios";

function JobSearch() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get("/api/jobs/search", {
          params: { query, location, page, limit: 10 }
        });
        setJobs(res.data.jobs);
        setTotalPages(res.data.pages);
      } catch (err) {
        console.error(err);
      }
    }
    fetchJobs();
  }, [query, location, page]);

  return (
    <div>
      <input
        placeholder="Job title or keywords"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={() => setPage(1)}>Search</button>

      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.jobTitle} at {job.company}</h3>
            <p>{job.location}</p>
          </li>
        ))}
      </ul>

      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} disabled={page === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default JobSearch;
