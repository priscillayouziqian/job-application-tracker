import { useState } from 'react';
import HomePage from './components/HomePage';
import { TEST_JOBS } from './TEST_JOBS';
import { Route, Routes } from 'react-router-dom';
import { Container } from "react-bootstrap";
import JobPage from './components/JobPage';
import Header from './components/Header';

function App() {
  const [jobsList, setJobsList] = useState( TEST_JOBS )

  return (
    <div>
      <Header />

      <Container className='mt-4'>
        <Routes>
            <Route path='/' element={ <HomePage jobsList={jobsList} /> } />
            <Route path='/jobs/:jobId' element={ <JobPage jobsList={jobsList} /> } />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
