import { useParams } from "react-router-dom"


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
    <div>
        <h3>{job.name}</h3>
        <p>{job.mode}</p>
    </div>
  )
}

export default JobPage