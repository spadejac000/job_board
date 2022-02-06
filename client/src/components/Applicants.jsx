import React, {useEffect} from 'react'
import {getApplicants} from '../actions/jobActions'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import Loader from './Loader';
import AlertMessage from './AlertMessage';

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
    <Container>
      <h1>Applicants List</h1>
      {
        applicants === null || applicants === undefined ? null : 
        loading ? <Loader/> : error ? <AlertMessage variant="danger">{error}</AlertMessage> : applicants.length === 0 ? (<h2>There are currently no applicants for this job</h2>) : 
          applicants.map(applicant => (
            <div key={applicant.application_id}>
              <p>{applicant.applicant_name}</p>
            </div>
          ))
      }
      
    </Container>
  )
}

export default Applicants
