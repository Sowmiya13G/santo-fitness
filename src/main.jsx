import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { queryClient } from "./app/queryClient";
import { store } from "./app/store";
import "./index.css";
// ✅ Register the service worker (provided by vite-plugin-pwa)
registerSW({
  onNeedRefresh() {
    if (confirm("New version available. Reload?")) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log("✅ App ready to work offline (PWA)");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
