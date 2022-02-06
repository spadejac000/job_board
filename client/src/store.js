import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {selectedJobReducer, getJobsReducer, getUserJobsReducer, editJobReducer, deleteAllJobsReducer, getFavoriteJobsReducer, getApplicantsReducer} from './reducers/jobReducer';
import {userReducer, authenticateReducer} from './reducers/userReducer';
import {themeReducer} from './reducers/themeReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  selectedJob: selectedJobReducer,
  getJobs: getJobsReducer,
  getUserJobs: getUserJobsReducer,
  getFavoriteJobs: getFavoriteJobsReducer,
  getApplicants: getApplicantsReducer,
  editJob: editJobReducer,
  deleteAllJobs: deleteAllJobsReducer,
  user: userReducer,
  authenticate: authenticateReducer,
  theme: themeReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['selectedJob', 'getJobs', 'getUserJobs', 'user']
}

const initialState = {}
const middleware = [thunk]
const store = createStore(persistReducer(persistConfig, rootReducer), initialState, composeWithDevTools(applyMiddleware(...middleware)))

const persistor = persistStore(store)

export {store, persistor};