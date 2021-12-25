import {USER_REQUEST, USER_SUCCESS, USER_FAIL} from '../constants/userConstants'

export const userReducer = (state = {user: ""}, action) => {
  switch(action.type) {
    case USER_REQUEST:
      return {user: ""}
    case USER_SUCCESS:
      return {user: action.payload}
    case USER_FAIL:
      return {error: action.payload}
    default:
      return state;
  }
}