import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import Auth from "./service/auth";
import BoardApi from "./service/board_api";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const auth = new Auth();
const boardApi = new BoardApi();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App auth={auth} boardApi={boardApi} />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
