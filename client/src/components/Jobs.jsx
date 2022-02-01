import Job from './Job';
function Jobs({jobs}) {
  return (
    <div>
      {jobs === null || jobs.jobs === undefined ? (<h2>There are no jobs currently available</h2>) : 
        jobs.jobs.map((job) => (
          <Job 
            key={job.job_id} 
            job={job}
          />
        ))
      }
      
    </div>
  )
}

export default Jobs
