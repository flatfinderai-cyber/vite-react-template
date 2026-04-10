/*
  main.tsx
  Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
  FlatFinder: Housing Revolutionised Inc.
  PROPRIETARY AND CONFIDENTIAL
*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
