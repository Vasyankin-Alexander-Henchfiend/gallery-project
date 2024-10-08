import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/app.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./components/app/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
