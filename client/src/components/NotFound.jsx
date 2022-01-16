import React from 'react'
import {Button} from 'react-bootstrap'
import {FaUnlink} from 'react-icons/fa'

const NotFound = () => {
  return (
    <div>
      <FaUnlink/>
      <h1>Page not found - status 404</h1>
      <Button>Back to home page</Button>
    </div>
  )
}

export default NotFound
