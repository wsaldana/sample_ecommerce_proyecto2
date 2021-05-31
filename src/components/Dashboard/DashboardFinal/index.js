import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Ranking from './ranking';
import Dropdown from './filter'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Dropdown />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
