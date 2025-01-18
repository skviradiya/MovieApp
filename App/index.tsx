import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStack from './navigation/MainStack';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
}
