import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobsSearch = () => {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    skills: '',
    salaryMin: '',
    salaryMax: '',
  });
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      const params = { ...filters, page, limit: 5 };
      try {
        const res = await axios.get('http://localhost:5000/api/jobs', { params });
        setJobs(res.data.jobs);
        setPages(res.data.pages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, [filters, page]);

  const handleInputChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = e => {
    e.preventDefault();
    setPage(1);  // Reset to first page when searching
    // fetchJobs will be called automatically by useEffect when filters or page change
  };

  return (
    <div>
      <h2>Search Jobs</h2>
      <form onSubmit={handleSearch}>
        <input name="title" placeholder="Job Title" value={filters.title} onChange={handleInputChange} />
        <input name="location" placeholder="Location" value={filters.location} onChange={handleInputChange} />
        <input name="skills" placeholder="Skills (comma-separated)" value={filters.skills} onChange={handleInputChange} />
        <input name="salaryMin" placeholder="Min Salary" type="number" value={filters.salaryMin} onChange={handleInputChange} />
        <input name="salaryMax" placeholder="Max Salary" type="number" value={filters.salaryMax} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>

      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <h3>{job.jobTitle}</h3>
            <p>{job.company} - {job.location}</p>
            <p>Salary: {job.salary}</p>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>

      <div>
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i + 1}
            disabled={page === i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobsSearch;
