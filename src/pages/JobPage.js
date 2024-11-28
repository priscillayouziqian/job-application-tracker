import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { formatDate } from "../utils/formateDate";
import NotesList from "../notes/NotesList";

const JobPage = ({jobsList}) => {
    // const jobId = 2; //just set it hard code to test
    let { jobId } = useParams()
    jobId = parseInt(jobId)

    const job = jobsList.find(g => g.id === jobId)

    //if job not found, (param more than job.lenth, or enter invalid letters)
    if(!job){
        return <h2>Job Not Found</h2>
    }

  return (
    <Container>
      <Row>
        <Col md='5' className='m-1'>
          <h3>{job.name}</h3>
          <p>Applied company: {job.company}</p>
          <p>Position mode: {job.mode}</p>
          <p>Application status: {job.status}</p>
          <p>Date applied: {formatDate(job.dateApplied)}</p>
        </Col>

        <NotesList jobId={jobId} />

      </Row>
        
    </Container>
  )
}

export default JobPage