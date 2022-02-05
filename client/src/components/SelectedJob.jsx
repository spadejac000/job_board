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
import AlertMessage from './AlertMessage'

const SelectedJob = () => {
  const dispatch = useDispatch()

  let userID = useSelector((state) =>
    state.user.userID
  )
  const selectedJob = useSelector((state) => state.selectedJob)

  useEffect(() => {
    dispatch(selectJob())
  }, [dispatch])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [alertMessageShow, setAlertMessageShow] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [resume, setResume] = useState('')
  const [message, setMessage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  })

  const {name, email, phone, location} = inputs

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const onSubmitApplication = async (e, jobID) => {
    e.preventDefault();
    setAlertMessageShow(true)
    const applicationData = new FormData();
    applicationData.append('resume', resume)
    applicationData.append('coverLetter', coverLetter)
    applicationData.append('name', name)
    applicationData.append('email', email)
    applicationData.append('phone', phone)
    applicationData.append('userID', userID)
    applicationData.append('jobID', jobID)

    for(let key of applicationData.keys()) {
      console.log(key, applicationData.get(key))
    }
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
  }

  const handleUploadCoverLetter = (e) => {
    setCoverLetter(e.target.files[0])
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
            {message ? <AlertMessage alertMessageShow={alertMessageShow} setAlertMessageShow={setAlertMessageShow} variant="info">{message}</AlertMessage> : null}
            <Form onSubmit={(e) => onSubmitApplication(e, selectedJob.job_id)}>
              <Form.Label>Name</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Name"
                  name="name"
                  value={name} 
                  onChange={e => onChange(e)}
                />
              </InputGroup>
              <Form.Label>Email</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Email"
                  name="email"
                  value={email} 
                  onChange={e => onChange(e)}
                />
              </InputGroup>
              <Form.Label>Phone number</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Phone number"
                  name="phone"
                  value={phone} 
                  onChange={e => onChange(e)}
                />
              </InputGroup>
              <Form.Label>Location</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Location"
                  name="location"
                  value={location} 
                  onChange={e => onChange(e)}
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
