import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserJobs} from '../actions/jobActions'
import {Container} from 'react-bootstrap'
import '../css/user-jobs.css'
import {motion, AnimatePresence} from 'framer-motion'
import UserJob from './UserJob'

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

  return (
    <Container>
      <h2>Your Posted Jobs</h2>
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
