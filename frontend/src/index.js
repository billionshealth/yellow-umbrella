import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './_app';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  // <BrowserRouter>
  <React.StrictMode>
    <App />
  {/* </BrowserRouter> */}
  </React.StrictMode>
  , document.getElementById('root')
);
