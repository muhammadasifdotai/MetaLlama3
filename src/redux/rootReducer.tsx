import {combineReducers} from 'redux';
import chatSlice from './reducers/chatSlice';

// Jitnay bhi reducer hay un ko hum yaha combine kr dain gay.
const rootReducer = combineReducers({
    chat: chatSlice,
})
export default rootReducer;