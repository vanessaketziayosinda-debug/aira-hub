import React from "react";
import { createRoot } from "react-dom/client";
import Solutions from "../Solutions";

const root = document.getElementById("solutions-app");

if (root) {
    createRoot(root).render(<Solutions />);
}
