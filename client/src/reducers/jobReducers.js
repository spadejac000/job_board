import {SELECTED_JOB_REQUEST, SELECTED_JOB_SUCCESS, SELECTED_JOB_FAIL} from '../constance/jobConstants'

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