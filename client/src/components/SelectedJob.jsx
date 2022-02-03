import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import {Card, Button, Row, Col, Modal, Form, InputGroup, FormControl} from 'react-bootstrap'
import '../css/selected-job.css'
import {FaTimes} from 'react-icons/fa'
import ResumeUpload from './ResumeUpload'

const SelectedJob = () => {
  const dispatch = useDispatch()

  const selectedJob = useSelector((state) => state.selectedJob)

  useEffect(() => {
    dispatch(selectJob())
    console.log('hello: ', selectedJob)
  }, [dispatch])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <Form>
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
              <ResumeUpload/>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

    </>
  )
}

export default SelectedJob
