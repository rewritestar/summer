import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import Auth from "./service/auth";
import BoardApi from "./service/board_api";

const root = ReactDOM.createRoot(document.getElementById("root"));
const auth = new Auth();
const boardApi = new BoardApi();
root.render(
  <React.StrictMode>
    <App auth={auth} boardApi={boardApi} />
  </React.StrictMode>
);
reportWebVitals();
