import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ModalProvider from "./context/ModalProvider.tsx";
import JobProvider from "./context/JobDataProvider.tsx";
import BatchReportProvider from "./context/BatchReportProvider.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <BatchReportProvider>
      <JobProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </JobProvider>
    </BatchReportProvider>
    </BrowserRouter>
  </React.StrictMode>
);
