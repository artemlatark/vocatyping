import React from 'react';

import {Provider} from 'react-redux';

import ReactDOM from 'react-dom/client';

import App from './App';
import {setupStore} from './store/store';
import './index.css';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
