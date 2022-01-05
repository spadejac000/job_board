import {USER_REQUEST, USER_SUCCESS, USER_FAIL} from '../constants/userConstants'

export const userReducer = (state = "", action) => {
  switch(action.type) {
    case USER_REQUEST:
      return state
    case USER_SUCCESS:
      return action.payload
    case USER_FAIL:
      return {error: action.payload}
    default:
      return state;
  }
}