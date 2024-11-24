import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

const HomePage = ({ jobsList }) => {
    const [modeFilter, setModeFilter] = useState("All");
    const [tempFilter, setTempFilter] = useState("All");
    const [tempTypeFilter, setTempTypeFilter] = useState("All");
    const [noJobsAlert, setNoJobsAlert] = useState(false);

    let filterJobs = jobsList;

    if (modeFilter !== "All") {
        filterJobs = filterJobs.filter((job) => job.mode === modeFilter);
    }

    if (tempTypeFilter !== "All") {
        filterJobs = filterJobs.filter((job) => job.type === tempTypeFilter);
    }

    // Effect to check for no jobs and reset filters
    useEffect(() => {
        if (filterJobs.length === 0) {
            setModeFilter("All");
            setTempFilter("All");
            setTempTypeFilter("All");
            setNoJobsAlert(true);
        } else {
            setNoJobsAlert(false);
        }
    }, [filterJobs]); // Dependency on filterJobs

    // Effect to show alert when no jobs are found
    useEffect(() => {
        if (noJobsAlert) {
            alert(`No job applications match your selected job mode: ${modeFilter} and type: ${tempTypeFilter}! Try another search.`);
        }
    }, [noJobsAlert, modeFilter, tempTypeFilter]); // Dependency on noJobsAlert, modeFilter, and tempTypeFilter

    return (
        <div>
            <div className="d-flex justify-content-center">
                <select className='form-select me-2' onChange={(e) => { setTempFilter(e.target.value); setModeFilter(e.target.value); }} value={tempFilter}>
                    <option value="All">All</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                </select>
                <select className='form-select me-2' onChange={(e) => { setTempTypeFilter(e.target.value); }} value={tempTypeFilter}>
                    <option value="All">All</option>
                    <option value="full time">Full Time</option>
                    <option value="part time">Part Time</option>
                    <option value="contract">Contract</option>
                </select>
            </div>
            <div className="row">
                {filterJobs.map((j, index) => (
                    <div className="col-md-4" key={index}>
                        <JobCard job={j} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;