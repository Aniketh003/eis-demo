import { Route, Routes } from "react-router-dom";
import "./App.css";
import TableComponent from "./components/Table";
import ModalComponent from "./components/ModalComponent";

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<TableComponent/>}></Route>
        <Route path="/batch-jobs/data/:batch_name" element={<ModalComponent/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
