import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './components/App/App';

const app = ReactDOM.createRoot(document.querySelector('#app'));
app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
