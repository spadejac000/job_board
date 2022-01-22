import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFavoriteJobs} from '../actions/jobActions'
import Loader from './Loader';
import AlertMessage from './AlertMessage';
import {Container, Button} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import '../css/favorite-jobs.css'

const FavoriteJobs = ({isAuthenticated}) => {

  const dispatch = useDispatch()

  let userID = useSelector((state) =>
    state.user.userID
  )

  useEffect(() => {
    dispatch(getFavoriteJobs(userID))
  }, [dispatch])

  const favoriteJobsState = useSelector(state => state.getFavoriteJobs)

  const {loadingFavoriteJobs, errorFavoriteJobs, favoriteJobs} = favoriteJobsState;

  return (
    isAuthenticated ?
    <Container>
      <h1 className="favorite-jobs-title">Favorite Jobs</h1>
      {loadingFavoriteJobs ? 
        <Loader/>: errorFavoriteJobs ? 
        <AlertMessage variant="danger">
          {errorFavoriteJobs}
        </AlertMessage> :
        favoriteJobs.map(favoriteJob => (
          <div className="favorite-job-container">
            <div>
              <h3>{favoriteJob.job_title}</h3>
              <h5>{favoriteJob.company_name}</h5>
              <h5>{favoriteJob.job_location}</h5>
            </div>
            <div className="fav-job-apply-del-container">
              <Button>Apply</Button>
              <FaTimes size={25}/>
            </div>
          </div>
      ))}
    </Container>
    : null
  )
}

export default FavoriteJobs
