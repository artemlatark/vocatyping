import React from 'react';

import {Provider} from 'react-redux';

import ReactDOM from 'react-dom/client';

import {setupStore} from 'store/store';

import {SpeechSynthesisContextProvider} from 'context/SpeechSynthesisContext';
import {ThemeContextProvider} from 'context/ThemeContext';

import App from './App';

import './index.css';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <SpeechSynthesisContextProvider>
        <App />
      </SpeechSynthesisContextProvider>
    </ThemeContextProvider>
  </Provider>
);
