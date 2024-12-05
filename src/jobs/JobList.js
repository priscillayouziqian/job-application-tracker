import React from 'react';
import { Col } from 'react-bootstrap';
import JobCard from './JobCard';

const JobList = ({ filterJobs, isLoading }) => {
    return (
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
    );
}

export default JobList;