import { useContext, useEffect, useState } from "react";
import "./App.css";
import HomeContainer from "./components/JobReports/HomeContainer";
import ModalContainer from "./components/ModalComponents/ModalContainer";
import BatchReports from "./components/BatchReports/BatchReports";
import { JobContext } from "./context/JobDataProvider";
import { ModalContext } from "./context/ModalProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EisDataRecoiliation from "./components/EisDataRecoiliation/EisDataRecoiliation";

function App() {
  const [selectVisible, setSelectVisible] = useState<string>("Home");
  const { importBatches, coreBatches, fetchImportBatches, fetchCoreBatches } =
    useContext(JobContext);
  const { modalOpen } = useContext(ModalContext);

  useEffect(() => {
    fetchImportBatches();
    fetchCoreBatches();
    if (!navigator.onLine) {
      toast.error("No internet connection.");
      return;
    }
  }, []);

  return (
    <div className="main-container">
      <div className="navbar">
        <button
          onClick={() => setSelectVisible("Home")}
          className={`${selectVisible === "Home" && "active"}`}
        >
          Job Reports
        </button>
        <button
          onClick={() => setSelectVisible("BatchReports")}
          className={`${selectVisible === "BatchReports" && "active"}`}
        >
          Batch Reports
        </button>
        <button
          onClick={() => setSelectVisible("EisDataReconciliation")}
          className={`${selectVisible === "EisDataReconciliation" && "active"}`}
        >
          Eis Data Reconciliation
        </button>
      </div>
      <div className="container-wrapper">
        <div className={`container ${selectVisible !== "Home" && "hidden"}`}>
          <HomeContainer
            importBatches={importBatches}
            coreBatches={coreBatches}
          />
        </div>
        <div
          className={`container ${
            selectVisible !== "BatchReports" && "hidden"
          }`}
        >
          <BatchReports />
        </div>
        <div
          className={`container ${
            selectVisible !== "EisDataReconciliation" && "hidden"
          }`}
        >
          <EisDataRecoiliation />
        </div>
      </div>
      {modalOpen && <ModalContainer />}
      <ToastContainer />
    </div>
  );
}

export default App;
