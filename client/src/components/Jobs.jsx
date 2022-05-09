import Job from './Job';
import {Row} from 'react-bootstrap';

function Jobs({jobs, isAuthenticated}) {
  return (
    <Row>
      {jobs === null || jobs.jobs === undefined ? (<h2>There are no jobs currently available</h2>) : 
        jobs.jobs.map((job) => (
          <div className="col-lg-6 col-md-12" key={job.job_id}>
            <Job 
              job={job}
              isAuthenticated={isAuthenticated}
            />
          </div>
        ))
      }
    </Row>
  )
}

export default Jobs
