import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/App';
import AppProviders from './utils/providers/AppProviders';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
