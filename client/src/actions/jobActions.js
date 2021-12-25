import axios from 'axios'
import {SELECTED_JOB_REQUEST, SELECTED_JOB_SUCCESS, SELECTED_JOB_FAIL} from '../constants/jobConstants'

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