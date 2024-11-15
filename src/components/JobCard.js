import { Link } from "react-router-dom";

const JobCard = ({job}) => {
    return (
        <div className="bg-light border p-4 m-2">
            <h4>{job.name}</h4>
            <p>{job.status}</p>
            <p>{job.company}</p>
            <Link to={"/jobs/" + job.id}>Details</Link>
          </div>
    )
};

export default JobCard;