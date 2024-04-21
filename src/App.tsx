import { useContext, useEffect, useMemo, useState } from "react";
import "./App.css";
import HomeContainer from "./components/JobReports/HomeContainer";
import ModalContainer from "./components/ModalComponents/ModalContainer";
import BatchReports from "./components/BatchReports/BatchReports";
import { JobContext } from "./context/JobDataProvider";
import { ModalContext } from "./context/ModalProvider";
import "react-toastify/dist/ReactToastify.css";
import EisDataRecoiliation from "./components/EisDataRecoiliation/EisDataRecoiliation";
import Navbar from "./components/JobReports/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MappingContainer from "./components/Mapping/MappingContainer";
import { ToastContainer } from "react-toastify";

function App() {
  const [selectVisible, setSelectVisible] = useState<string>("Home");
  const { importBatches, coreBatches, fetchImportBatches, fetchCoreBatches } =
    useContext(JobContext);
  const { modalOpen } = useContext(ModalContext);

  useEffect(() => {
    fetchImportBatches();
    fetchCoreBatches();
  }, []);

  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        },
      }),
    [mode]
  );

  return (
    <div
      className={`main-container ${theme.palette.mode === "dark" && "dark"}`}
    >
      <ThemeProvider theme={theme}>
        <Navbar
          selectVisible={selectVisible}
          setSelectVisible={setSelectVisible}
        />
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
          <div
            className={`container ${selectVisible !== "Mapping" && "hidden"}`}
          >
            <MappingContainer />
          </div>
        </div>
        {modalOpen && <ModalContainer />}
      </ThemeProvider>
      <ToastContainer/>
    </div>
  );
}

export default App;
