import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserJobs} from '../actions/jobActions'

const UserJobs = () => {

  const dispatch = useDispatch();

  let userJobs = useSelector((state) =>
    state.getUserJobs
  )

  let userID = useSelector((state) =>
    state.user.userID
  )

  console.log('user id in user jobs component: ', userID)

  useEffect(() => {
    dispatch(getUserJobs(userID))
  }, [dispatch])

  console.log('here is the user jobs: ', userJobs)

  return (
    <div>
      <h2>Your Jobs</h2>
    </div>
  )
}

export default UserJobs
