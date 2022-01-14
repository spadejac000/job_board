import {USER_REQUEST, USER_SUCCESS, USER_FAIL, DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAIL} from '../constants/userConstants'

export const printUser = () => async (dispatch) => {
  try {
    dispatch({type: USER_REQUEST})
    let data = await fetch('/api/users', {
      method: "GET",
      headers: {token: localStorage.token}
    })
    const parseResponse = await data.json();
    
    dispatch({
      type: USER_SUCCESS, 
      payload: parseResponse
    })
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response.data.message
  })
  }
}

export const deleteAccount = (id) => async (dispatch) => {
  try {
    dispatch({type: DELETE_ACCOUNT_REQUEST})
    let data = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {token: localStorage.token}
    })
    const parseResponse = await data.json();
    
    dispatch({
      type: DELETE_ACCOUNT_SUCCESS, 
      payload: parseResponse
    })
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response.data.message
  })
  }
}