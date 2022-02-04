import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import {FaUpload} from 'react-icons/fa'
import AlertMessage from './AlertMessage'

const ResumeUpload = ({message, alertMessageShow, setAlertMessageShow}) => {

  const [resume, setResume] = useState('')
  const [resumeName, setResumeName] = useState('')

  const handleUploadResume = (e) => {
    setResume(e.target.files[0])
    setResumeName(e.target.files[0].name)
  }

  // const onSubmitResume = async (e) => {
  //   e.preventDefault();
  //   setAlertMessageShow(true)
  //   const resumeData = new FormData();
  //   resumeData.append('file', resume)
  //   try {
  //     const response = await axios.post('/api/jobs/upload-resume', resumeData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       },
  //       onUploadProgress: progressEvent => {
  //         setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
  //         // clear percentage
  //         setTimeout(() => setUploadPercentage(0), 10000)
  //       }
  //     })
  //     const {fileName, filePath} = response.data
  //     setUploadedResume(fileName, filePath)
  //     setMessage('Application Complete')
  //   } catch (error) {
  //     if(error.response.status === 500) {
  //       setMessage('There was a problem with the server')
  //     } else {
  //       setMessage(error.response.data.msg)
  //     }
  //   }
  // }

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
