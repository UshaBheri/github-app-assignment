import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import storage from "./redux/storage";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={storage}>
      <App />
    </Provider>
  </React.StrictMode>
);
