import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "primeicons/primeicons.css";
import "@/styles/index.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
