import React from "react";
import { createRoot } from "react-dom/client";
import ClandoPrototype from "../clando-prototype.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClandoPrototype />
  </React.StrictMode>
);
