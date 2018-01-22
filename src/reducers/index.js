import {combineReducers} from 'redux';
import Navigation from './Navigation';
import Local from './Local'
export default combineReducers({
    nav: Navigation,
    local: Local
})