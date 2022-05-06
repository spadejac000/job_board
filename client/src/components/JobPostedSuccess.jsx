import React from 'react'
import {Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const JobPostedSuccess = () => {
  return (
    <Container>
      <h2>You successfully posted your new job!</h2>
      <Link to="/jobs-created" className="btn btn-primary">Return to your jobs</Link>
    </Container>
  )
}

export default JobPostedSuccess
