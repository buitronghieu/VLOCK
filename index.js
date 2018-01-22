import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import store from './src/store';
let index = ()=>{
    return(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
AppRegistry.registerComponent('VLock', () => index);
