import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import EditModeProvider from "./contexts/edit-mode/EditModeProvider.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <EditModeProvider>
        <App />
      </EditModeProvider>
    </ErrorBoundary>
  </StrictMode>
);
