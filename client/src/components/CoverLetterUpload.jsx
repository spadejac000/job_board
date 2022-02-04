import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import {FaUpload} from 'react-icons/fa'
import AlertMessage from './AlertMessage'

const CoverLetterUpload = ({message, alertMessageShow, setAlertMessageShow}) => {

  const [coverLetter, setCoverLetter] = useState('')
  const [coverLetterName, setCoverLetterName] = useState('')

  const handleUploadCoverLetter = (e) => {
    setCoverLetter(e.target.files[0])
    setCoverLetterName(e.target.files[0].name)
  }

  // const onSubmitCoverLetter = async (e) => {
  //   e.preventDefault();
  //   setAlertMessageShow(true)
  //   const coverLetterData = new FormData();
  //   coverLetterData.append('file', coverLetter)
  //   try {
  //     const response = await axios.post('/api/jobs/upload-cover-letter', coverLetterData, {
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
  //     setUploadedCoverLetter(fileName, filePath)
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
        <Form.Label><FaUpload/> Upload cover letter</Form.Label>
        <Form.Control type="file" onChange={handleUploadCoverLetter}/>
      </Form.Group>
    </>
  )
}

export default CoverLetterUpload
