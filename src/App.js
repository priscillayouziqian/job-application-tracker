import { useState } from 'react';
import HomePage from './components/HomePage';
import { TEST_JOBS } from './TEST_JOBS';
import { Link, Route, Routes } from 'react-router-dom';
import JobPage from './components/JobPage';
import { Container, Navbar, Nav } from 'react-bootstrap';



function App() {
  const [jobsList, setJobsList] = useState( TEST_JOBS )

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to='/'>My Job Applications</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/' >Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

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
