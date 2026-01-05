import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./components/UI";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}

// Register service worker for PWA shell
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch((err) => {
      console.error("Service worker registration failed", err);
    });
  });
}
