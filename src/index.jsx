import React, { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import './index.css';
import { Provider } from "react-redux";
import store from './redux/store'
import App from "./App";
import "./assets/icons/remixicon.css";
import "./assets/less/yoda-theme.less";

ReactDOM.render(
  <Suspense fallback="loading">
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);