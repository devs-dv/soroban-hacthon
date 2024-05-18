import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import MySorobanReactProvider from "./web3/MySorobanReactProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MySorobanReactProvider>
      <App />
    </MySorobanReactProvider>
  </React.StrictMode>
);
