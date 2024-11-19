import { useState } from "react";
import JobCard from "../components/JobCard";


const HomePage = ({jobsList}) => {
    const [modeFilter, setModeFilter] = useState("All");

    let filterJobs;

    if (modeFilter === "All") {
      filterJobs = jobsList;
    } else {
      filterJobs = jobsList.filter((job) => job.mode === modeFilter);
    }

  return (
    <div>
        <div>
        <button className='btn btn-primary me-2' onClick={() => setModeFilter("All")}>All</button>
        <button className='btn btn-primary me-2' onClick={() => setModeFilter("remote")}>Remote</button>
        <button className='btn btn-primary me-2' onClick={() => setModeFilter("onsite")}>Onsite</button>
        <button className='btn btn-primary' onClick={() => setModeFilter("hybrid")}>Hybrid</button>
      </div>
        {filterJobs.map((j, index) => <JobCard key={index} job={j} />)}
    </div>
  )
}

export default HomePage