import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {selectedJobReducer, getJobsReducer} from './reducers/jobReducer';
import {userReducer} from './reducers/userReducer';
import {themeReducer} from './reducers/themeReducer';

const reducer = combineReducers({
  selectedJob: selectedJobReducer,
  getJobs: getJobsReducer,
  user: userReducer,
  theme: themeReducer
})

const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;