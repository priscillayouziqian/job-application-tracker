import JobCard from './JobCard';

const jobList = [
  {
    id: 0,
    name: "front-end developer",
    company: "Apple",
    status: null
  },
  {
    id: 1,
    name: "back-end developer",
    company: "Google",
    status: null
  },
  {
    id: 2,
    name: "full stack developer",
    company: "TikTok",
    status: null
  }
]

function App() {
  return (
    <div>
      <h1>My Job Tracking App</h1>
      {jobList.map(j => <JobCard job={j} />)}
    </div>
  );
}

export default App;
