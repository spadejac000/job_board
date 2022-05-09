import {THEME_REQUEST, THEME_SUCCESS, THEME_FAIL} from '../constants/themeConstants'

export const getThemeReducer = (state = {userTheme: 'light'}, action) => {
  switch(action.type) {
    case THEME_REQUEST:
      return state
    case THEME_SUCCESS:
      return action.payload
    case THEME_FAIL:
      return {error: action.payload}
    default:
      return state;
  }
}