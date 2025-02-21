import React, { useEffect, useState } from 'react';
import { Alert, Row } from 'react-bootstrap';
import { selectAllJobs } from '../jobs/jobsSlice';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import JobFilters from '../jobs/JobFilters';
import JobList from '../jobs/JobList';

const HomePage = () => {
    const jobsList = useSelector(selectAllJobs);
    const isLoading = useSelector((state) => state.jobs.isLoading);
    const errMsg = useSelector((state) => state.jobs.errMsg);

    const [modeFilter, setModeFilter] = useState("All");
    const [tempTypeFilter, setTempTypeFilter] = useState("All");
    const [noJobsAlert, setNoJobsAlert] = useState(false);
    const [show, setShow] = useState(true);
    const [filterJobs, setFilterJobs] = useState(jobsList);

    const filterJobsByModeAndType = (jobs) => {
        let filteredJobs = jobs;

        if (modeFilter !== "All") {
            filteredJobs = filteredJobs.filter((job) => job.mode === modeFilter);
        }

        if (tempTypeFilter !== "All") {
            filteredJobs = filteredJobs.filter((job) => job.type === tempTypeFilter);
        }

        return filteredJobs;
    };

    useEffect(() => {
        const filteredJobs = filterJobsByModeAndType(jobsList);
        setFilterJobs(filteredJobs);
        if (!isLoading) {
            setNoJobsAlert(filteredJobs.length === 0);
        }
    }, [modeFilter, tempTypeFilter, jobsList, isLoading]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            console.log('Token found:', token); // Debugging line
            localStorage.setItem('token', token);
            fetchUserProfile(token); // Fetch user profile
        } else {
            console.log('No token found'); // Debugging line
        }
    }, []);

    const fetchUserProfile = async (token) => {
        console.log('Fetching user profile with token:', token); // Debugging line
        try {
            const response = await fetch('https://localhost:3443/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userData = await response.json();
            console.log('Fetched user data:', userData); // Debugging line
            localStorage.setItem('user', JSON.stringify(userData)); // Store user data
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleAlertClose = () => {
        setShow(false);
        setModeFilter("All");
        setTempTypeFilter("All");

        const filteredJobs = filterJobsByModeAndType(jobsList);
        setFilterJobs(filteredJobs);
        setNoJobsAlert(filteredJobs.length === 0);
        setShow(true);
    };

    if (isLoading) {
        return (
            <Row>
                <Loading />
            </Row>
        );
    }

    if (errMsg) {
        return (
            <Row>
                <Error errMsg={errMsg} />
            </Row>
        );
    }

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

            {errMsg && <Alert variant="danger">{errMsg}</Alert>}

            <JobFilters 
                modeFilter={modeFilter} 
                setModeFilter={setModeFilter} 
                tempTypeFilter={tempTypeFilter} 
                setTempTypeFilter={setTempTypeFilter} 
            />

            <JobList filterJobs={filterJobs} isLoading={isLoading} />
        </div>
    );
}

export default HomePage;