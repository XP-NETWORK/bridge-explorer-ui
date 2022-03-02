import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import "./components/elements/elements.css";
import "./assets/media.css"
import { BrowserRouter } from "react-router-dom";
import { ServiceProvider } from "../src/context/ServcieProvder";
import io from "socket.io-client";


const socket = io("ws://dev-explorer-api.herokuapp.com", {
  path: "/socket.io",
});

/*const socket = io("ws://localhost:3100", {
  path: "/socket.io",
});*/

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceProvider value={socket}>
        <App />
      </ServiceProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
