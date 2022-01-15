import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserJobs} from '../actions/jobActions'
import {Container, Button, Row, Col} from 'react-bootstrap'
import '../css/user-jobs.css'
import {motion, AnimatePresence} from 'framer-motion'
import UserJob from './UserJob'
import {FaTimes} from 'react-icons/fa'
import {deleteAllJobs} from '../actions/jobActions'

const UserJobs = () => {

  const dispatch = useDispatch();

  let userJobs = useSelector((state) =>
    state.getUserJobs
  )

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
    <Container>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>Your Posted Jobs</h2>
        <Button className={`delete-all-job-btn ${userJobs && userJobs.length === 0 ? " disabled " : ""}`} variant="danger" onClick={handleDeleteAllJobs}><FaTimes/> Delete all jobs</Button>
      </div>
      <AnimatePresence>
        {userJobs === null ? (<h2>You have no jobs posted</h2>) : userJobs.map((job) => (
          <motion.div 
            key={job.job_id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <UserJob job={job}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </Container>
  )
}

export default UserJobs
