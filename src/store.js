import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reduces from './reducers';
let middlewares = [thunk];
if(__DEV__) middlewares.push(logger);
export default createStore(reduces, applyMiddleware(...middlewares));