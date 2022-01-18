import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserJobs} from '../actions/jobActions'
import {Container, Button} from 'react-bootstrap'
import '../css/user-jobs.css'
import {motion, AnimatePresence} from 'framer-motion'
import UserJob from './UserJob'
import {FaTimes} from 'react-icons/fa'
import {deleteAllJobs} from '../actions/jobActions'
import Loader from './Loader'
import AlertMessage from './AlertMessage';

const UserJobs = ({isAuthenticated}) => {

  const dispatch = useDispatch();

  // let userJobs = useSelector((state) =>
  //     state.getUserJobs.userJobs
  // )

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
      dispatch(deleteAllJobs(userID))
      dispatch(getUserJobs(userID))
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
          userJobs.map((job) => (
          <motion.div 
            key={job.job_id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <UserJob job={job}/>
          </motion.div>
        ))
        }
      </AnimatePresence>
    </Container>
    : null
  )
}

export default UserJobs
