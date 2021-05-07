import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './store';
import ShowCreateProvider from './context/ShowCreateContext';

import fireApi from './store/apis';

import App from './App';
import './index.scss';

fireApi();

export const { store, persistor } = configureStore();

const render = (Component) => {
  return ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ShowCreateProvider>
          <Component />
        </ShowCreateProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);
