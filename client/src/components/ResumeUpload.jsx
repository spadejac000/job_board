import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {FaUpload} from 'react-icons/fa'
import axios from 'axios'

const ResumeUpload = () => {

  const [resume, setResume] = useState('')
  const [resumeName, setResumeName] = useState('')
  const [uploadedResume, setUploadedResume] = useState({})

  const handleUploadResume = (e) => {
    setResume(e.target.files[0])
    setResumeName(e.target.files[0].name)
  }

  const onSubmitResume = async (e) => {
    e.preventDefault();
    console.log('working thus far')
    const resumeData = new FormData();
    resumeData.append('file', resume)
    console.log('working thus far 2')
    try {
      const response = await axios.post('/api/jobs/upload-resume', resumeData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('working thus far 3')
      const {fileName, filePath} = response.data
      setUploadedResume(fileName, filePath)
      console.log('upload resume working')
    } catch (error) {
      if(error.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(error.response.data.msg)
      }
    }
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
