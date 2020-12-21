/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Login from './src/components/Login';
import React from 'react'
import { name as appName } from './app.json';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './src/App';
import MovieCube from './src/components/MovieCube';

// const store = configureStore()

// const RNRedux = () => (
//     <Provider store={store}>
//         <Login />
//     </Provider>
// )
AppRegistry.registerComponent(appName, () => Login);
