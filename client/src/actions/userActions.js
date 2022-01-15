import {USER_REQUEST, USER_SUCCESS, USER_FAIL, DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL} from '../constants/userConstants'
import axios from 'axios'

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

export const updatePassword = (id, body) => async (dispatch) => {
  try {
    console.log('update pass action hit! ', id, body)
    dispatch({type: UPDATE_PASSWORD_REQUEST})
    let data = await axios.put(`/api/users/${id}`, body)
    const parseResponse = await data.json();
    
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS, 
      payload: parseResponse
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response.data.message
  })
  }
}