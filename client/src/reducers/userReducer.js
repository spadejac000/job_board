import {USER_REQUEST, USER_SUCCESS, USER_FAIL, DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAIL} from '../constants/userConstants'

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

export const deleteUserReducer = (state = "", action) => {
  switch(action.type) {
    case DELETE_ACCOUNT_REQUEST:
      return state
    case DELETE_ACCOUNT_SUCCESS:
      return action.payload
    case DELETE_ACCOUNT_FAIL:
      return {error: action.payload}
    default:
      return state;
  }
}