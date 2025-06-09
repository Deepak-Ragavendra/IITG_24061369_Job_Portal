import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ApplicationList from "./components/ApplicationList";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import CandidateForm from "./components/CandidateForm";
import JobsSearch from "./components/JobsSearch";        // Make sure this exists in /components
import CandidatesSearch from "./components/CandidatesSearch";  // Create this component

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleJobAdded = () => {
    setRefreshFlag(!refreshFlag); // toggles flag to trigger refresh
  };

  return (
    <Router>
      <div>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>Job Portal System</h1>

        {/* Navigation links */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Home</Link> |{" "}
          <Link to="/applications">Applications</Link> |{" "}
          <Link to="/search-jobs">Search Jobs</Link> |{" "}
          <Link to="/search-candidates">Search Candidates</Link>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Home Route: You can show your main components here */}
          <Route
            path="/"
            element={
              <>
                <JobForm onJobAdded={handleJobAdded} />
                <JobList refreshFlag={refreshFlag} />
                <CandidateForm />
              </>
            }
          />

          <Route path="/applications" element={<ApplicationList />} />
          <Route path="/search-jobs" element={<JobsSearch />} />
          <Route path="/search-candidates" element={<CandidatesSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
