import { Link } from "react-router-dom";

const JobCard = ({job}) => {
    return (
        <div className="bg-light border p-4 m-2 text-center">
            <h4>{job.name}</h4>
            <p>{job.type}</p>
            <p>{job.mode}</p>
            <Link 
                to={"/jobs/" + job.id} 
                className="btn btn-primary"
            >
                Details
            </Link>
          </div>
    )
};

export default JobCard;