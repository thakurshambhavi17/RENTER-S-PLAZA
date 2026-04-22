import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import Bootstrap globally
import "bootstrap/dist/css/bootstrap.min.css";

// Import your custom theme overrides
import "./Theme.css";

// If you want global resets or additional styles, you can add them here too
// import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);