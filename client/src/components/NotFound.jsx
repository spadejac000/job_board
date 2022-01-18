import React from 'react'
import {Container, Button} from 'react-bootstrap'
import {FaUnlink} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <Container>
      <FaUnlink size={50}/>
      <h1>Page not found - status 404</h1>
      <Link className="btn btn-primary" to="/">Back to home page</Link>
    </Container>
  )
}

export default NotFound
