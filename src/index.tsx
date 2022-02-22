import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import "./components/elements/elements.css";
import { BrowserRouter } from "react-router-dom";
import io from "socket.io-client";

console.log("d");
const socket = io("ws://localhost:3100", { path: "/socket.io" });
socket.on("msg", (data) => {
  console.log(data);
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
