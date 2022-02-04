import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import {Card, Button, Row, Col, Modal, Form, InputGroup, FormControl} from 'react-bootstrap'
import '../css/selected-job.css'
import {FaTimes} from 'react-icons/fa'
import ResumeUpload from './ResumeUpload'
import CoverLetterUpload from './CoverLetterUpload'
import axios from 'axios'
import Progress from './Progress'

const SelectedJob = () => {
  const dispatch = useDispatch()

  const selectedJob = useSelector((state) => state.selectedJob)

  useEffect(() => {
    dispatch(selectJob())
  }, [dispatch])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [alertMessageShow, setAlertMessageShow] = useState(false)

  const [coverLetter, setCoverLetter] = useState('')
  const [coverLetterName, setCoverLetterName] = useState('')
  const [resume, setResume] = useState('')
  const [resumeName, setResumeName] = useState('')
  const [message, setMessage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const onSubmitApplication = async (e) => {
    e.preventDefault();
    setAlertMessageShow(true)
    const applicationData = new FormData();
    applicationData.append('resume', resume)
    applicationData.append('coverLetter', coverLetter)
    try {
      const response = await axios.post('/api/jobs/upload-application', applicationData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
          // clear percentage
          setTimeout(() => setUploadPercentage(0), 10000)
        }
      })
      setMessage('Application Complete')
    } catch (error) {
      if(error.response.status === 500) {
        setMessage('There was a problem with the server')
      } else {
        setMessage(error.response.data.msg)
      }
    }
  }

  const handleUploadResume = (e) => {
    setResume(e.target.files[0])
    setResumeName(e.target.files[0].name)
  }

  const handleUploadCoverLetter = (e) => {
    setCoverLetter(e.target.files[0])
    setCoverLetterName(e.target.files[0].name)
  }

  return (
    <>
      {selectedJob === null ? (null): (
        <Card className="m-3 selected-job-card">
          <Card.Header>
            <Row>
              <Col>
                <h2>{selectedJob.job_title}</h2>
                <h6>{selectedJob.company_name}</h6>
                <h6>{selectedJob.salary}</h6>
                <Button onClick={handleShow}>Apply</Button>
              </Col>
              <Col className="exit-selected-job-col">
                <div onClick={() => dispatch(selectJob(null))}>
                  <FaTimes/>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-5">
            <p>{selectedJob._description}</p>
          </Card.Body>
        </Card>
      )}

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedJob ? selectedJob.company_name : null}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{selectedJob ? selectedJob.job_title : null}</h5>
            <hr/>
            <Form onSubmit={onSubmitApplication}>
              <Form.Label>Name</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Name"
                />
              </InputGroup>
              <Form.Label>Email</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Email"
                />
              </InputGroup>
              <Form.Label>Phone number</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Phone number"
                />
              </InputGroup>
              <Form.Label>Location</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Location"
                />
              </InputGroup>
              <ResumeUpload 
                message={message} 
                alertMessageShow={alertMessageShow} setAlertMessageShow={setAlertMessageShow}
                handleUploadResume={handleUploadResume}
              />
              <CoverLetterUpload 
                message={message} 
                alertMessageShow={alertMessageShow} setAlertMessageShow={setAlertMessageShow}
                handleUploadCoverLetter={handleUploadCoverLetter}
              />
              <Progress percentage={uploadPercentage}/>
              <Button variant="primary" type="submit">
              Submit
            </Button>
            </Form>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>

    </>
  )
}

export default SelectedJob
