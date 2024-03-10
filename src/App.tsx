import { useContext } from "react";
import "./App.css";
import HomeContainer from "./components/HomeContainer";
import ModalContainer from "./components/ModalContainer";
import { ModalContext } from "./context/ModalProvider";

function App() {
  const modalContext = useContext(ModalContext);
  return (
    <div className="main-container">
      <HomeContainer />
      {modalContext?.modalOpen && <ModalContainer />}
    </div>
  );
}

export default App;
