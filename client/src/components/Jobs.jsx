import Job from './Job';
function Jobs({jobs}) {
  return (
    <div>
      {jobs.map((job) => (
        <Job 
          key={job.id} 
          job={job}
        />
      ))}
    </div>
  )
}

export default Jobs
