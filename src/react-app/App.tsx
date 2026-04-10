/*
  App.tsx
  Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
  FlatFinder: Housing Revolutionised Inc.
  Patent Pending (CIPO) | Trademarks Pending (CIPO)
  PROPRIETARY AND CONFIDENTIAL
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./Signup";
import Terms from "./Terms";
import Privacy from "./Privacy";
import "./Landing.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}
