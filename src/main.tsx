import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ModalProvider from "./context/ModalProvider.tsx";
import JobProvider from "./context/JobDataProvider.tsx";
import BatchReportProvider from "./context/BatchReportProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BatchReportProvider>
      <JobProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </JobProvider>
    </BatchReportProvider>
  </React.StrictMode>
);
