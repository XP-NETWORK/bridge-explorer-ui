import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import "./components/elements/elements.css";
import "./assets/media.css"
import { BrowserRouter } from "react-router-dom";
import './global.d.ts'


String.prototype.isIPFS = function () {
  return this.includes('ipfs://')
}




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
