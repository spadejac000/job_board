import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import {FaUpload} from 'react-icons/fa'
import AlertMessage from './AlertMessage'

const ResumeUpload = ({message, alertMessageShow, setAlertMessageShow, handleUploadResume}) => {

  const [resume, setResume] = useState('')
  const [resumeName, setResumeName] = useState('')

  return (
    <>
      {message ? <AlertMessage alertMessageShow={alertMessageShow} setAlertMessageShow={setAlertMessageShow} variant="info">{message}</AlertMessage> : null}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><FaUpload/> Upload resume</Form.Label>
        <Form.Control type="file" onChange={handleUploadResume}/>
      </Form.Group>
    </>
  )
}

export default ResumeUpload
