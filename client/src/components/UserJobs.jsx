import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserJobs} from '../actions/jobActions'
import {Container, Button, Row, Col} from 'react-bootstrap'
import '../css/user-jobs.css'
import {motion, AnimatePresence} from 'framer-motion'
import UserJob from './UserJob'
import {FaTimes} from 'react-icons/fa'
import {deleteAllJobs} from '../actions/jobActions'
import Loader from './Loader'
import AlertMessage from './AlertMessage';

const UserJobs = ({isAuthenticated}) => {

  const dispatch = useDispatch();

  const userJobsState = useSelector(state => state.getUserJobs)
  const {loadingUserJobs, errorUserJobs, userJobs} = userJobsState

  let userID = useSelector((state) =>
    state.user.userID
  )

  useEffect(() => {
    dispatch(getUserJobs(userID))
  }, [dispatch])

  const handleDeleteAllJobs = async (e) => {
    e.preventDefault()
    try {
      if(window.confirm('Are you sure you want to delete all your posted jobs?')) {
        dispatch(deleteAllJobs(userID))
        dispatch(getUserJobs(userID))
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    isAuthenticated ? 
    <Container>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>Your Posted Jobs</h2>
        <Button className={`delete-all-job-btn ${userJobs && userJobs.length === 0 ? " disabled " : ""}`} variant="danger" onClick={handleDeleteAllJobs}><FaTimes/> Delete all jobs</Button>
      </div>
      <AnimatePresence>
        {loadingUserJobs ?
          <Loader/> :
          errorUserJobs ?
          <AlertMessage variant="danger">{errorUserJobs}</AlertMessage> : 
          userJobs.length === 0 ? 
          <div className="mt-5">
            <h2>You currently have no jobs posted</h2>
          </div>
          :
          <div>
            <Row className="mt-5 user-jobs-header g-0">
              <Col>
                <h6 className="user-jobs-title">Job Title</h6>
              </Col>
              <Col>
                <h6 className="user-jobs-title">Company</h6>
              </Col>
              <Col>
                <h6 className="user-jobs-title">Work Type</h6>
              </Col>
              <Col>
                <h6 className="user-jobs-title">Job Type</h6>
              </Col>
              <Col>
                <h6 className="user-jobs-title">Job Address</h6>
              </Col>
              <Col>
                <h6 className="user-jobs-title">Actions</h6>
              </Col>
            </Row>
            {userJobs.map((job) => (
            <motion.div 
              key={job.job_id}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
              <UserJob job={job}/>
            </motion.div>
          ))}
        </div>
        }
      </AnimatePresence>
    </Container>
    : null
  )
}

export default UserJobs
