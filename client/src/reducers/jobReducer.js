import {SELECTED_JOB_REQUEST, SELECTED_JOB_SUCCESS, SELECTED_JOB_FAIL, POST_JOB_REQUEST, POST_JOB_SUCCESS, POST_JOB_FAIL, GET_JOBS_REQUEST, GET_JOBS_SUCCESS, GET_JOBS_FAIL, GET_USER_JOBS_REQUEST, GET_USER_JOBS_SUCCESS, GET_USER_JOBS_FAIL, DELETE_USER_JOB_REQUEST, DELETE_USER_JOB_SUCCESS, DELETE_USER_JOB_FAIL, EDIT_JOB_REQUEST, EDIT_JOB_SUCCESS, EDIT_JOB_FAIL, DELETE_ALL_JOBS_REQUEST, DELETE_ALL_JOBS_SUCCESS, DELETE_ALL_JOBS_FAIL} from '../constants/jobConstants'

export const selectedJobReducer = (state = null, action) => {
  switch (action.type) {
    case SELECTED_JOB_REQUEST:
      return state
    case SELECTED_JOB_SUCCESS:
      if(action.payload === undefined) {
        return null
      } else {
        return action.payload
      }
    case SELECTED_JOB_FAIL:
      return action.payload
    default:
      return state
  }
}

export const postJobReducer = (state = null, action) => {
  switch (action.type) {
    case POST_JOB_REQUEST:
      return state
    case POST_JOB_SUCCESS:
      if(action.payload === undefined) {
        return null
      } else {
        return action.payload
      }
    case POST_JOB_FAIL:
      return action.payload
    default:
      return state
  }
}

export const getJobsReducer = (state = {jobs: []}, action) => {
  switch (action.type) {
    case GET_JOBS_REQUEST:
      return {loading: true, state}
    case GET_JOBS_SUCCESS:
      return {loading: false, jobs: action.payload}
    case GET_JOBS_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

export const getUserJobsReducer = (state = {userJobs: []}, action) => {
  switch (action.type) {
    case GET_USER_JOBS_REQUEST:
      return {loadingUserJobs: true, state}
    case GET_USER_JOBS_SUCCESS:
      return {loadingUserJobs: false, userJobs: action.payload}
    case GET_USER_JOBS_FAIL:
      return {loadingUserJobs: false, errorUserJobs: action.payload}
    default:
      return state
  }
}

export const deleteUserJobReducer = (state, action) => {
  switch (action.type) {
    case DELETE_USER_JOB_REQUEST:
      return state
    case DELETE_USER_JOB_SUCCESS:
      const filteredUserJobs = state.getUserJobs.filter(job => job.job_id !== action.payload.id /* or id */)
      return {...state, getUserJobs: filteredUserJobs}
    case DELETE_USER_JOB_FAIL:
      return action.payload
    default:
      return state
  }
}

export const deleteAllJobsReducer = (state = null, action) => {
  switch (action.type) {
    case DELETE_ALL_JOBS_REQUEST:
      return state
    case DELETE_ALL_JOBS_SUCCESS:
      return state
    case DELETE_ALL_JOBS_FAIL:
      return action.payload
    default:
      return state
  }
}

export const editJobReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_JOB_REQUEST:
      return state
    case EDIT_JOB_SUCCESS:
      return {...state, editedJob: action.payload}
    case EDIT_JOB_FAIL:
      return action.payload
    default:
      return state
  }
}