import React from 'react'
import {Form} from 'react-bootstrap'
import {FaUpload} from 'react-icons/fa'

const ResumeUpload = ({handleUploadResume}) => {

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><FaUpload/> Upload resume</Form.Label>
        <Form.Control type="file" onChange={handleUploadResume}/>
      </Form.Group>
    </>
  )
}

export default ResumeUpload
