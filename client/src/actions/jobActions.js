import axios from 'axios'
import {SELECTED_JOB_REQUEST, SELECTED_JOB_SUCCESS, SELECTED_JOB_FAIL, POST_JOB_REQUEST, POST_JOB_SUCCESS, POST_JOB_FAIL, GET_JOBS_REQUEST, GET_JOBS_SUCCESS, GET_JOBS_FAIL, GET_USER_JOBS_REQUEST, GET_USER_JOBS_SUCCESS, GET_USER_JOBS_FAIL, DELETE_USER_JOB_REQUEST, DELETE_USER_JOB_SUCCESS, DELETE_USER_JOB_FAIL, EDIT_JOB_REQUEST, EDIT_JOB_SUCCESS, EDIT_JOB_FAIL, DELETE_ALL_JOBS_REQUEST, DELETE_ALL_JOBS_SUCCESS, DELETE_ALL_JOBS_FAIL, ADD_JOB_TO_FAVORITES_REQUEST, ADD_JOB_TO_FAVORITES_SUCCESS, ADD_JOB_TO_FAVORITES_FAIL, GET_FAVORITE_JOBS_REQUEST, GET_FAVORITE_JOBS_SUCCESS, GET_FAVORITE_JOBS_FAIL, DELETE_FAVORITE_JOB_REQUEST, DELETE_FAVORITE_JOB_SUCCESS, DELETE_FAVORITE_JOB_FAIL} from '../constants/jobConstants'

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

export const getJobs = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({type: GET_JOBS_REQUEST})

    let data = await axios.get(`/api/jobs?${keyword.trim()}&pageNumber=${pageNumber}`).then(res => res.data)

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

export const deleteAllJobs = (id) => async (dispatch) => {
  try {
    dispatch({type: DELETE_ALL_JOBS_REQUEST})

    const deleteAllJobs = await axios.delete(`/api/jobs/all-user-jobs/${id}`).then(res => res.data)

    dispatch({
      type: DELETE_ALL_JOBS_SUCCESS,
      payload: deleteAllJobs
    })
  } catch (error) {
    dispatch({
      type: DELETE_ALL_JOBS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const editJob = (body) => async (dispatch) => {
  try {
    dispatch({type: EDIT_JOB_REQUEST})

    const data = await axios.put(`/api/jobs`, body).then(res => res.data)

    dispatch({
      type: EDIT_JOB_SUCCESS,
      payload: getUserJobs()
    })
  } catch (error) {
    dispatch({
      type: EDIT_JOB_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const addJobToFavorites = (jobID, userID) => async (dispatch) => {
  try {
    let body = {jobID, userID}
    dispatch({type: ADD_JOB_TO_FAVORITES_REQUEST})

    const favoritedJob = await axios.post(`/api/jobs/favorites`, body).then(res => res.data)

    console.log('favorite job: ', favoritedJob)

    dispatch({
      type: ADD_JOB_TO_FAVORITES_SUCCESS,
      payload: null
      // favoritedJob
    })
  } catch (error) {
    dispatch({
      type: ADD_JOB_TO_FAVORITES_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getFavoriteJobs = (user_id) => async (dispatch) => {
  try {
    dispatch({type: GET_FAVORITE_JOBS_REQUEST})

    let data = await axios.get('/api/jobs/favorites', {params: {
      user_id: user_id
    }}).then(res => res.data)

    dispatch({
      type: GET_FAVORITE_JOBS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_FAVORITE_JOBS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteFavoriteJob = (userID, jobID) => async (dispatch) => {
  try {
    dispatch({type: DELETE_FAVORITE_JOB_REQUEST})

    let data = await axios.delete(`/api/jobs/favorites/${jobID}`, {params: {
      user_id: userID
    }}).then(res => res.data)

    dispatch({
      type: DELETE_FAVORITE_JOB_SUCCESS,
      payload: getFavoriteJobs()
    })
  } catch (error) {
    dispatch({
      type: DELETE_FAVORITE_JOB_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

