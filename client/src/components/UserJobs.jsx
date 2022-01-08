import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserJobs} from '../actions/jobActions'
import {Card, Container, Badge, Button} from 'react-bootstrap'
import {FaEdit, FaTimes} from 'react-icons/fa'
import '../css/user-jobs.css'
import EditJobModal from './EditJobModal'

const UserJobs = () => {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let userJobs = useSelector((state) =>
    state.getUserJobs
  )

  let userID = useSelector((state) =>
    state.user.userID
  )

  useEffect(() => {
    dispatch(getUserJobs(userID))
  }, [dispatch])

  const deleteUserJob = async (id) => {
    try {
      const deleteUserJob = await fetch(`/api/jobs/${id}`, {
        method: "DELETE"
      })
      // userJobs.filter(job => job.job_id !== id)
      dispatch(getUserJobs(userID))
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Container>
      <h2>Your Posted Jobs</h2>
      {userJobs === null ? (<h2>You have no jobs posted</h2>) : userJobs.map((job) => (
        <Card key={job.job_id} className="mt-5 mb-5 p-5">
          <h1>{job.job_title}</h1>
          <h3>{job.company_name}</h3>
          <h6>
            {job.work_address} {job.city} {job._state} {job.zip}
          </h6>
          <div className="user-job-salary-container"><h6>Salary: </h6><Badge>{job.salary}</Badge></div>
          <div className="user-job-benefits-container"><h6>Benefits: </h6><Badge>None right now</Badge></div>
          <div className="user-job-type-container"><h6>Job Type: </h6><Badge>{job.job_type}</Badge></div>
          <div className="user-job-location-container"><h6>Job Location: </h6><Badge>{job.job_location}</Badge></div>

          <h6>Job Description: </h6>
          <p>{job._description}</p>
          <div className="user-job-actions-container">
            <Button variant="warning" onClick={handleShow}><FaEdit/> Edit</Button>
            <Button variant="danger" onClick={() => deleteUserJob(job.job_id)}><FaTimes/> Delete</Button>
          </div>
        </Card>
      ))}
      <EditJobModal show={show} handleClose={handleClose}/>
    </Container>
  )
}

export default UserJobs
