import React, { useState } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import CandidateForm from "./components/CandidateForm";



function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleJobAdded = () => {
    setRefreshFlag(!refreshFlag); // toggles flag to trigger refresh
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Job Portal System</h1>
      <JobForm onJobAdded={handleJobAdded} />
      <JobList refreshFlag={refreshFlag} />
      <CandidateForm />
      
    </div>
    
  );
}

export default App;
