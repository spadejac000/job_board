import React from 'react'
import {Form} from 'react-bootstrap'
import {FaUpload} from 'react-icons/fa'

const CoverLetterUpload = ({handleUploadCoverLetter}) => {

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><FaUpload/> Upload cover letter</Form.Label>
        <Form.Control type="file" onChange={handleUploadCoverLetter}/>
      </Form.Group>
    </>
  )
}

export default CoverLetterUpload
