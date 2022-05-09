import {THEME_REQUEST, THEME_SUCCESS, THEME_FAIL} from '../constants/themeConstants'
import axios from 'axios'

export const getTheme = (user_id) => async (dispatch) => {
  try {
    dispatch({type: THEME_REQUEST})
    
    let data = await axios.get('/api/users/user-theme', {params: {
      user_id: user_id
    }}).then(res => res.data)

    console.log('theme actions user theme: ', data)

    dispatch({
      type: THEME_SUCCESS, 
      payload: data
    })
  } catch (error) {
    dispatch({
      type: THEME_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response.data.message
  })
  }
}

export const updateTheme = (themeData, user_id) => async (dispatch) => {
  try {
    dispatch({type: THEME_REQUEST})
    let body = {themeData, user_id}
    let data = await axios.post('/api/users/user-theme', body).then(res => res.data)

    dispatch({
      type: THEME_SUCCESS, 
      payload: data
    })
  } catch (error) {
    dispatch({
      type: THEME_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response.data.message
  })
  }
}