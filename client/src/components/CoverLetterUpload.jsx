import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import {FaUpload} from 'react-icons/fa'
import AlertMessage from './AlertMessage'

const CoverLetterUpload = ({message, alertMessageShow, setAlertMessageShow, handleUploadCoverLetter}) => {

  const [coverLetter, setCoverLetter] = useState('')
  const [coverLetterName, setCoverLetterName] = useState('')

  return (
    <>
      {message ? <AlertMessage alertMessageShow={alertMessageShow} setAlertMessageShow={setAlertMessageShow} variant="info">{message}</AlertMessage> : null}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><FaUpload/> Upload cover letter</Form.Label>
        <Form.Control type="file" onChange={handleUploadCoverLetter}/>
      </Form.Group>
    </>
  )
}

export default CoverLetterUpload
