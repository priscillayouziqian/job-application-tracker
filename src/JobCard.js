
const JobCard = (props) => {
    return (
        <div className="bg-light border p-4 m-2">
            <h4>{props.job.name}</h4>
            <p>{props.job.status}</p>
            <p>{props.job.company}</p>
          </div>
    )
};

export default JobCard;