import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import reducer from "./Reducers"
import { legacy_createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

let store = legacy_createStore(reducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);