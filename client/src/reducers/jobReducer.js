import {SELECTED_JOB_REQUEST, SELECTED_JOB_SUCCESS, SELECTED_JOB_FAIL, POST_JOB_REQUEST, POST_JOB_SUCCESS, POST_JOB_FAIL, GET_JOBS_REQUEST, GET_JOBS_SUCCESS, GET_JOBS_FAIL, GET_USER_JOBS_REQUEST, GET_USER_JOBS_SUCCESS, GET_USER_JOBS_FAIL, DELETE_USER_JOB_REQUEST, DELETE_USER_JOB_SUCCESS, DELETE_USER_JOB_FAIL} from '../constants/jobConstants'

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

export const getJobsReducer = (state = null, action) => {
  switch (action.type) {
    case GET_JOBS_REQUEST:
      return state
    case GET_JOBS_SUCCESS:
      if(action.payload === undefined) {
        return null
      } else {
        return action.payload
      }
    case GET_JOBS_FAIL:
      return action.payload
    default:
      return state
  }
}

export const getUserJobsReducer = (state = null, action) => {
  switch (action.type) {
    case GET_USER_JOBS_REQUEST:
      return state
    case GET_USER_JOBS_SUCCESS:
      if(action.payload === undefined) {
        return null
      } else {
        return action.payload
      }
    case GET_USER_JOBS_FAIL:
      return action.payload
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