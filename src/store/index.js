import { createStore } from 'redux';
import tempData from '../../tempData'
import rootReducer from '../reducers'

const initialState = {
    lists: tempData
}
export default store = createStore(rootReducer, initialState)
