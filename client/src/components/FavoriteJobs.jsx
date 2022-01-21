import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFavoriteJobs} from '../actions/jobActions'

const FavoriteJobs = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavoriteJobs())
  }, [])

  const favoriteJobs = useSelector(state => state.getFavoriteJobs)

  return (
    <div>
      {favoriteJobs.map(favoriteJob => (
        <div>
          hello
        </div>
      ))}
    </div>
  )
}

export default FavoriteJobs
