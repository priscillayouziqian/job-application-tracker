import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { formatDate } from "../utils/formateDate";
import NotesList from "../notes/NotesList";
import { selectAllJobs, selectJobById } from '../jobs/jobsSlice';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

const JobPage = () => {
    const jobsList = useSelector(selectAllJobs);
    const isLoading = useSelector((state) => state.jobs.isLoading);
    const errMsg = useSelector((state) => state.jobs.errMsg);

    // const jobId = 2; //just set it hard code to test
    let { jobId } = useParams()
    jobId = parseInt(jobId)

    const job = useSelector(selectJobById(jobId))

    //if job not found, (param more than job.lenth, or enter invalid letters)
    // if(!job){
    //     return <h2>Job Not Found</h2>
    // }

    if(isLoading){
      return (
        <Row>
          <Loading />
        </Row>
      )
    }

    if(errMsg){
      return(
        <Row>
          <Error errMsg={errMsg} />
        </Row>
      )
    }

  return (
    <Container>
      <Row>
        <Col md='5' className='m-1'>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title className="mb-3">{job.name}</Card.Title>
              <Card.Text className="mb-2 text-muted">Applied company: {job.company}</Card.Text>
              <Card.Text>Position mode: {job.mode}</Card.Text>
              <Card.Text>Application status: {job.status}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Skills: {job.skills.join(', ')}</ListGroup.Item>
              <ListGroup.Item>Job link: <a href={job.jobLink} target="_blank" rel="noopener noreferrer">{job.jobLink}</a></ListGroup.Item>
              <ListGroup.Item>Date applied: {formatDate(job.dateApplied)}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <NotesList jobId={jobId} />
        
      </Row>
    </Container>
  )
}

export default JobPage