import { useContext } from "react";
import ModalComponent from "./ModalComponent";
import { ModalContext } from "../context/ModalProvider";

const ModalContainer = () => {

  const modalContext = useContext(ModalContext)

  return (
    <div className="modal">
      <div className="modal-background">
        <div className="close-btn">
          <button className="action-btn" onClick={modalContext?.closeModal}>close</button>
        </div>
        <ModalComponent />
      </div>
    </div>
  );
};

export default ModalContainer;
