import {THEME_REQUEST, THEME_SUCCESS, THEME_FAIL} from '../constants/themeConstants'

export const updateTheme = (data) => async (dispatch) => {
  try {
    dispatch({type: THEME_REQUEST})
    
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