import axios from 'axios'
import {SELECTED_JOB_REQUEST, SELECTED_JOB_SUCCESS, SELECTED_JOB_FAIL, POST_JOB_REQUEST, POST_JOB_SUCCESS, POST_JOB_FAIL, GET_JOBS_REQUEST, GET_JOBS_SUCCESS, GET_JOBS_FAIL, GET_USER_JOBS_REQUEST, GET_USER_JOBS_SUCCESS, GET_USER_JOBS_FAIL, DELETE_USER_JOB_REQUEST, DELETE_USER_JOB_SUCCESS, DELETE_USER_JOB_FAIL} from '../constants/jobConstants'

export const selectJob = (data) => async (dispatch) => {
  try {
    dispatch({type: SELECTED_JOB_REQUEST})
    dispatch({
      type: SELECTED_JOB_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: SELECTED_JOB_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const postJob = (body) => async (dispatch) => {
  try {
    dispatch({type: POST_JOB_REQUEST})

    let data = await axios.post('/api/jobs/post-job', body).then(res => res.data)

    dispatch({
      type: POST_JOB_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: POST_JOB_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getJobs = () => async (dispatch) => {
  try {
    dispatch({type: GET_JOBS_REQUEST})

    let data = await axios.get('/api/jobs').then(res => res.data)

    dispatch({
      type: GET_JOBS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_JOBS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getUserJobs = (user_id) => async (dispatch) => {
  try {
    dispatch({type: GET_USER_JOBS_REQUEST})

    let data = await axios.get('/api/jobs/current-user-jobs', {params: {
      user_id: user_id
    }}).then(res => res.data)

    dispatch({
      type: GET_USER_JOBS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_USER_JOBS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteUserJob = (id) => async (dispatch) => {
  try {
    dispatch({type: DELETE_USER_JOB_REQUEST})

    const deleteUserJob = await fetch(`/api/jobs/${id}`, {
      method: "DELETE"
    }).then(res => res.data)

    dispatch({
      type: DELETE_USER_JOB_SUCCESS,
      payload: deleteUserJob
    })
  } catch (error) {
    dispatch({
      type: DELETE_USER_JOB_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

