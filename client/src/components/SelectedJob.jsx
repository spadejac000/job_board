import {useState} from 'react'
import {useSelector} from 'react-redux'
import {Container, Button, Modal, Form, InputGroup, FormControl} from 'react-bootstrap'
import '../css/selected-job.css'
import {FaArrowLeft} from 'react-icons/fa'
import ResumeUpload from './ResumeUpload'
import CoverLetterUpload from './CoverLetterUpload'
import axios from 'axios'
import Progress from './Progress'
import AlertMessage from './AlertMessage'
import {Link} from 'react-router-dom'

const SelectedJob = () => {

  let userID = useSelector((state) =>
    state.user.userID
  )
  const selectedJob = useSelector((state) => state.selectedJob)

  const [showReturnToJobSearchPage, setShowReturnToJobSearchPage] = useState(false)
  const [resumeName, setResumeName] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [locationError, setLocationError] = useState("")
  const [showSource, setShowSource] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setMessage('')
    setInputs({
      name: "",
      email: "",
      phone: "",
      location: ""
    })
    setShowReturnToJobSearchPage(false)
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const [alertMessageShow, setAlertMessageShow] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
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
    applicationData.append('resume', showSource)
    applicationData.append('resumeName', resumeName)
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
      setShowReturnToJobSearchPage(true)
    } catch (error) {
      if(error.response.status === 500) {
        setMessage('There was a problem with the server')
      } else {
        setMessage(error.response.data.msg)
      }
    }
  }

  const handleResumeInputChange = (e) => {
    e.preventDefault()
    setResumeName(e.target.files[0].name)
    const resume = e.target.files[0]
    showResume(resume)
  }

  const showResume = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setShowSource(reader.result)
    }
  }

  const handleUploadCoverLetter = (e) => {
    setCoverLetter(e.target.files[0])
  }

  // input validation functions
  const validateName = () => {
    if(name === "") {
      setNameError("Please enter your name")
    } else {
      setNameError("")
    }
  }

  const validateEmail = () => {
    if(!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      setEmailError("Please enter a valid email")
    } else {
      setEmailError("")
    }
  }

  const validatePhone = () => {
    if(!phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
      setPhoneError("Please enter a valid phone number")
    } else {
      setPhoneError("")
    }
  }

  const validateLocation = () => {
    if(location === "") {
      setLocationError("Please enter a valid location")
    } else {
      setLocationError("")
    }
  }

  return (
    <Container className="my-5">
      <Link 
        to="/" 
        className="btn btn-primary selected-job-back-link mb-5"
      >
        <FaArrowLeft className="me-1"/> Go Back
      </Link>
      {selectedJob === null ? (null): (
        <div className="selected-job-card">
          <div className="mb-5">
            <h2>{selectedJob.job_title}</h2>
            <h6>{selectedJob.company_name}</h6>
            <h6>${selectedJob.salary}</h6>
            <Button onClick={handleShow}>Apply</Button>
          </div>
          <div className="">
            <h5>Job Details</h5>
            <hr/>
            <strong>Job Location</strong><p>{selectedJob.job_location}</p>
            <strong>Job Type</strong><p>{selectedJob.job_type}</p>
            <strong>Salary</strong><p>${selectedJob.salary}</p>
            <hr/>
            <p>{selectedJob._description}</p>
          </div>
        </div>
      )}

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedJob ? selectedJob.company_name : null}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{selectedJob ? selectedJob.job_title : null}</h5>
            <hr/>
            {message ? <AlertMessage alertMessageShow={alertMessageShow} setAlertMessageShow={setAlertMessageShow} variant="info">{message}</AlertMessage> : null}
            {showReturnToJobSearchPage === false ?
              <Form onSubmit={(e) => onSubmitApplication(e, selectedJob.job_id)}>
                <Form.Label>Name</Form.Label>
                <InputGroup className="mb-3" hasValidation>
                  <FormControl
                    placeholder="Name"
                    name="name"
                    value={name} 
                    onChange={e => onChange(e)}
                    required
                    onBlur={() => validateName()}
                    isInvalid={nameError === "" ? false : true}
                    isValid={name.length > 0 ? true : false}
                  />
                  <Form.Control.Feedback type={nameError === "" ? "valid" : "invalid"}>
                    {nameError}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Label>Email</Form.Label>
                <InputGroup className="mb-3"  hasValidation>
                  <FormControl
                    placeholder="Email"
                    name="email"
                    value={email} 
                    onChange={e => onChange(e)}
                    required
                    onBlur={() => validateEmail()}
                    isInvalid={emailError === "" ? false : true}
                    isValid={email.length > 0 ? true : false}
                  />
                  <Form.Control.Feedback type={emailError === "" ? "valid" : "invalid"}>
                    {emailError}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Label>Phone number</Form.Label>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Phone number"
                    name="phone"
                    value={phone} 
                    onChange={e => onChange(e)}
                    required
                    onBlur={() => validatePhone()}
                    isInvalid={phoneError === "" ? false : true}
                    isValid={phone.length > 0 ? true : false}
                  />
                  <Form.Control.Feedback type={phoneError === "" ? "valid" : "invalid"}>
                    {phoneError}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Label>Location</Form.Label>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Location"
                    name="location"
                    value={location} 
                    onChange={e => onChange(e)}
                    required
                    onBlur={() => validateLocation()}
                    isInvalid={locationError === "" ? false : true}
                    isValid={location.length > 0 ? true : false}
                  />
                  <Form.Control.Feedback type={locationError === "" ? "valid" : "invalid"}>
                    {locationError}
                  </Form.Control.Feedback>
                </InputGroup>
                <ResumeUpload 
                  message={message} 
                  alertMessageShow={alertMessageShow} setAlertMessageShow={setAlertMessageShow}
                  handleUploadResume={handleResumeInputChange}
                />
                {/* <CoverLetterUpload 
                  message={message} 
                  alertMessageShow={alertMessageShow} setAlertMessageShow={setAlertMessageShow}
                  handleUploadCoverLetter={handleUploadCoverLetter}
                /> */}
                <Progress percentage={uploadPercentage}/>
                <Button variant="primary" type="submit">
                Submit
              </Button>
              </Form>
            :
              <Button variant="primary" onClick={handleClose}>
                Return to job search
              </Button>

            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </Container>
  )
}

export default SelectedJob
