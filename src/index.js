import React from "react";
import ReactDOM from "react-dom/client";
// React-Redux Package is the way for app and redux to talk to each other
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
