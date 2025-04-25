import  { StrictMode } from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; 
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

