import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "reactjs-popup/dist/index.css";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
