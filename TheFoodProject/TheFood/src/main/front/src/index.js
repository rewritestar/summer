import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import Auth from "./service/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
const auth = new Auth();
root.render(
  <React.StrictMode>
    <App auth={auth} />
  </React.StrictMode>
);
reportWebVitals();
