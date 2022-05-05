import React, {useEffect, Suspense} from 'react'
import {getApplicants} from '../actions/jobActions'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {Container, Row, Col, ListGroup} from 'react-bootstrap';
import Loader from './Loader';
import AlertMessage from './AlertMessage';
import {FaComments} from 'react-icons/fa'
import '../css/applicants.css'

const Applicants = () => {

  const dispatch = useDispatch();
  const location = useLocation()
  let urlpath = location.pathname
  let parts = urlpath.split('/')
  let jobID = parts[parts.length - 1];
  let getAllApplicants = useSelector((state) =>
    state.getApplicants
  )

  const {loading, error, applicants} = getAllApplicants;

  useEffect(() => {
    dispatch(getApplicants(jobID))
  }, [dispatch])

  return (
    <Suspense fallback={<Loader/>}>
      <Container>
        <h1 className="mb-5">Applicants List</h1>
        {
          applicants === null || applicants === undefined ? null : 
          loading ? <Loader/> : error ? <AlertMessage variant="danger">{error}</AlertMessage> : applicants.length === 0 ? (<h2>There are currently no applicants for this job</h2>) : 
            
          <ListGroup>
            <ListGroup.Item>
              <Row className="text-center py-4">
                <Col>
                  <h6 className="applicants-table-header">Resume</h6>
                </Col>
                <Col>
                  <h6 className="applicants-table-header">Applicant Name</h6>
                </Col>
                <Col>
                  <h6 className="applicants-table-header">Chat Messages</h6>
                </Col>
              </Row>
            </ListGroup.Item>
            {applicants.map(applicant => (
              <ListGroup.Item key={applicant.application_id} className="text-center">
                <Row className="py-3 applicant-details-row">
                  <Col>
                    <a 
                      className="applicant-detail" 
                      href={applicant.applicant_resume_url} 
                      target="_blank"
                    >
                      {applicant.applicant_resume_name}
                    </a>
                  </Col>
                  <Col>
                    <p className="applicant-detail">
                      {applicant.applicant_name}
                    </p>
                  </Col>
                  <Col>
                  <p className="applicant-detail">
                    <FaComments 
                      className="applicant-message-icon"
                    />
                  </p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        }
      </Container>
    </Suspense>
  )
}

export default Applicants
