import { combineReducers } from 'redux'
import authReducer from './auth'

const rootReducer = combineReducers({
  face: authReducer
})

export default rootReducer
