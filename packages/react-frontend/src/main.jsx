// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp.jsx";
import "./nav.css";
import "./main.css";
import "./col.css";

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render:
root.render(<MyApp />);