import displayDataReducer from './displayDataReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    displayData: displayDataReducer
})

export default rootReducer;