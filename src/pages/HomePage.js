import React, { useEffect, useState } from 'react';
import { Alert, Col } from 'react-bootstrap';
import JobCard from '../components/JobCard';

const HomePage = ({ jobsList, isLoading }) => {
    const [modeFilter, setModeFilter] = useState("All");
    const [tempFilter, setTempFilter] = useState("All");
    const [tempTypeFilter, setTempTypeFilter] = useState("All");
    const [noJobsAlert, setNoJobsAlert] = useState(false);
    const [show, setShow] = useState(true);
    const [filterJobs, setFilterJobs] = useState(jobsList);

    useEffect(() => {
        let filteredJobs = jobsList;

        if (modeFilter !== "All") {
            filteredJobs = filteredJobs.filter((job) => job.mode === modeFilter);
        }

        if (tempTypeFilter !== "All") {
            filteredJobs = filteredJobs.filter((job) => job.type === tempTypeFilter);
        }

        setFilterJobs(filteredJobs); // Update filterJobs state

        // Show alert if no jobs are found and loading is complete
        if (!isLoading) {
            setNoJobsAlert(filteredJobs.length === 0);
        }
    }, [modeFilter, tempTypeFilter, jobsList, isLoading]); // Dependency on filters, jobsList, and loading state

    const handleAlertClose = () => {
        setShow(false); // Hide the alert
        // Reset mode, type, temp filters to All
        setModeFilter("All");
        setTempTypeFilter("All");
        setTempFilter("All");
        
        let filteredJobs = jobsList;

        if (modeFilter !== "All") {
            filteredJobs = filteredJobs.filter((job) => job.mode === modeFilter);
        }

        if (tempTypeFilter !== "All") {
            filteredJobs = filteredJobs.filter((job) => job.type === tempTypeFilter);
        }

        setFilterJobs(filteredJobs); 
        setNoJobsAlert(filteredJobs.length === 0); // Check if no jobs are available and update alert state
        setShow(true); // Show the alert again if no jobs are found
    };

    return (
        <div>
            {noJobsAlert && show && (
                <Alert variant="danger" onClose={handleAlertClose} dismissible>
                    <Alert.Heading>Oh snap!</Alert.Heading>
                    <p>
                        No matches found for the selected mode and type! Try another
                        search. <br />
                        Click the upper right close button to reset to 'All' available job applications.
                    </p>
                </Alert>
            )}
            
            <div className="d-flex justify-content-center mb-3">
                <select className='form-select me-2' onChange={(e) => { setTempFilter(e.target.value); setModeFilter(e.target.value); }} value={tempFilter}>
                    <option value="All">All modes</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                </select>
                <select className='form-select me-2' onChange={(e) => { setTempTypeFilter(e.target.value); }} value={tempTypeFilter}>
                    <option value="All">All types</option>
                    <option value="full time">Full Time</option>
                    <option value="part time">Part Time</option>
                    <option value="contract">Contract</option>
                </select>
            </div>

            <div className="row">
                {filterJobs.length > 0 ? (
                    filterJobs.map(job => (
                        <Col key={job.id} xs={12} sm={6} md={4} className="mb-4">
                            <JobCard job={job} />
                        </Col>
                    ))
                ) : (
                    !isLoading && <p className="text-center mt-3">No job applications available.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;