import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import '@splidejs/react-splide/css/core';
import './App.scss';
import Main from './main'
import reportWebVitals from './reportWebVitals';
import store from './store'
import { getRenderContainer } from './utils'

ReactDOM.render(<Provider store={store}><Main /></Provider>,
  getRenderContainer()
);
reportWebVitals();

