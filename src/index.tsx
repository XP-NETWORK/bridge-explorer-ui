import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import "./index.css";
import "./components/elements/elements.css";
import "./assets/media.css"
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import './global.d.ts'


String.prototype.isIPFS = function () {
  return this.includes('ipfs://')
}




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
