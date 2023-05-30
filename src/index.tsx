import React from 'react';

import {Provider} from 'react-redux';

import ReactDOM from 'react-dom/client';

import App from './App';
import {SpeechSynthesisContextProvider} from './context/SpeechSynthesisContext';
import {setupStore} from './store/store';
import './index.css';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <SpeechSynthesisContextProvider>
      <App />
    </SpeechSynthesisContextProvider>
  </Provider>
);
