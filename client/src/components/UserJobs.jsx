import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserJobs} from '../actions/jobActions'
import {Card, Container, Badge} from 'react-bootstrap'

const UserJobs = () => {

  const dispatch = useDispatch();

  let userJobs = useSelector((state) =>
    state.getUserJobs
  )

  let userID = useSelector((state) =>
    state.user.userID
  )

  useEffect(() => {
    dispatch(getUserJobs(userID))
  }, [dispatch])

  // const {city, company_name, job_location, job_title, job_type, salary, work_address, zip, _description, _state} = userJobs

  return (
    <Container>
      <h2>Your Jobs</h2>
      {userJobs.map((job) => (
        <Card className="mt-5 mb-5 p-5">
          <h3>{job.job_title}</h3>
          <h4>{job.company_name}</h4>
          <h6>{job.work_address} {job.city} {job._state} {job.zip}</h6>
          <div><p>Salary </p><Badge>{job.salary}</Badge></div>
          <div><p>Job Type </p><Badge>{job.job_type}</Badge></div>
          <div><p>Job Location</p><Badge>{job.job_location}</Badge></div>

          <p>{job._description}</p>
        </Card>
      ))}
    </Container>
  )
}

export default UserJobs
