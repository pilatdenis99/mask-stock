import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import { HospitalsContextProvider } from "./context/HospitalContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HospitalsContextProvider>
        <App />
      </HospitalsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
