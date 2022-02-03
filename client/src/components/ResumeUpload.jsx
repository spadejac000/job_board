import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {FaUpload} from 'react-icons/fa'

const ResumeUpload = () => {

  const [resume, setResume] = useState('')
  const [resumeName, setResumeName] = useState('')

  const handleUploadResume = (e) => {
    setResume(e.target.files[0])
    setResumeName(e.target.files[0].name)
  }

  const onSubmitResume = () => {
    console.log('hello')
  }

  return (
    <>
      <Form onSubmit={onSubmitResume}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label><FaUpload/> Upload resume</Form.Label>
          <Form.Control type="file" onChange={handleUploadResume}/>
        </Form.Group>
        <Button type="submit">Upload resume</Button>
      </Form>
    </>
  )
}

export default ResumeUpload
