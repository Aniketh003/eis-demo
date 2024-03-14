import { useContext, useState } from "react";
import "./App.css";
import HomeContainer from "./components/HomeContainer";
import ModalContainer from "./components/ModalContainer";
import { ModalContext } from "./context/ModalProvider";
import BatchReports from "./components/BatchReports";

function App() {

  const [selectVisible,setSelectVisible] = useState<string>("Home");

  const modalContext = useContext(ModalContext);

  return (
    <div className="main-container">
      <div className="navbar">
        <button onClick={() => setSelectVisible("Home")} className={`${selectVisible === "Home" && "active"}`}>Job Reports</button>
        <button onClick={() => setSelectVisible("BatchReports")} className={`${selectVisible === "BatchReports" && "active"}`}>Batch Reports</button>
      </div>
      {selectVisible === "Home" && <HomeContainer />}
      {modalContext?.modalOpen && <ModalContainer />}
      {selectVisible === "BatchReports" && <BatchReports />}
    </div>
  );
}

export default App;
