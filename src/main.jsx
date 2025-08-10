import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { registerSW } from "virtual:pwa-register";
import App from "./App.jsx";
import { queryClient } from "./app/query-client";
import { persistor, store } from "./features/store.js";
import "./index.css";
import { toast } from "react-toastify";

// ✅ Register the service worker
const updateSW = registerSW({
  onNeedRefresh() {
    toast.info(
      <div>
        <span>A new version is available.</span>
        <button
          style={{
            marginLeft: "10px",
            padding: "4px 8px",
            background: "#4cafef",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => updateSW()}
        >
          Update
        </button>
      </div>,
      { autoClose: false }
    );
  },
  onOfflineReady() {
    toast.success("App is ready to work offline");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
