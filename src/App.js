import { useState } from 'react';
import HomePage from './pages/HomePage';
import AddApplicatonPage from './pages/AddApplicatonPage';
// import { TEST_JOBS } from './shared/TEST_JOBS';
import { selectAllJobs } from './jobs/jobsSlice';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Container } from "react-bootstrap";
import JobPage from './pages/JobPage';
import Header from './components/Header';

function App() {
  // access the jobs data using useSelecter
  const jobs = useSelector(selectAllJobs);
  const [jobsList, setJobsList] = useState(jobs);

  return (
    <div>
      <Header />

      <Container className='mt-4'>
        <Routes>
            <Route path='/' element={ <HomePage jobsList={jobsList} /> } />
            <Route path='/jobs/:jobId' element={ <JobPage jobsList={jobsList} /> } />
            <Route path='/addApplication' element={ <AddApplicatonPage /> } />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
