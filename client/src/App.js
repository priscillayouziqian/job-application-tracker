import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AddApplicatonPage from './pages/AddApplicatonPage';
// import { TEST_JOBS } from './shared/TEST_JOBS';
import { selectAllJobs } from './jobs/jobsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Container } from "react-bootstrap";
import JobPage from './pages/JobPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { fetchJobs } from './jobs/jobsSlice';
import { fetchNotes } from './notes/notesSlice';
import Login from './components/Login';

function App() {
  const dispatch = useDispatch();

  // access the jobs data using useSelecter
  const jobs = useSelector(selectAllJobs);

  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchJobs());
            setIsLoading(false);
        };
        fetchData();
        dispatch(fetchNotes());
    }, [dispatch]);
  
  useEffect(() => {
    setJobsList(jobs);
  }, [jobs]);

  return (
    <div>
      <Header />

      <Container className='mt-4' style={{ paddingBottom: '50px' }}>
        <Routes>
            <Route path='/' element={ <HomePage jobsList={jobsList} isLoading={isLoading}/> } />
            <Route path='/jobs/:jobId' element={ <JobPage jobsList={jobsList} /> } />
            <Route path='/addApplication' element={ <AddApplicatonPage /> } />
            <Route path='/login' element={ <Login /> } />
        </Routes>
      </Container>

      <Footer />
    </div>
  );
}

export default App;
