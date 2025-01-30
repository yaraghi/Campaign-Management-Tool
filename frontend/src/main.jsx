import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css"; 


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer />
  </>
);
