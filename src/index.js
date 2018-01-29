import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import store from './configStore'
export default index = () =>{
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}