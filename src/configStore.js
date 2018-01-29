import {createStore, applyMiddleware} from 'redux';
import reduces from './reduces';
import thunk from 'redux-thunk';
export default store = createStore(
    reduces,
    {},
    applyMiddleware(thunk)
)