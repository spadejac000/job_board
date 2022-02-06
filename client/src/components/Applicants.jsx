import React, {useEffect} from 'react'
import {getApplicants} from '../actions/jobActions'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'

const Applicants = () => {

  const dispatch = useDispatch();
  const location = useLocation()
  let urlpath = location.pathname
  let parts = urlpath.split('/')
  let jobID = parts[parts.length - 1];

  useEffect(() => {
    dispatch(getApplicants(jobID))
  }, [dispatch])

  return (
    <div>
      Applicants List
    </div>
  )
}

export default Applicants
