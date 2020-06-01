import { combineReducers } from 'redux'
import addList from './listReducer'

export default combineReducers({
    lists: addList
})