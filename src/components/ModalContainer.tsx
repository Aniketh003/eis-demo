import { useContext } from "react";
import ModalComponent from "./ModalComponent";
import { ModalContext } from "../context/ModalProvider";

const ModalContainer = () => {

  const modalContext = useContext(ModalContext)

  return (
    <div className={`${modalContext?.modalOpen && `open`} modal`}>
      <div className="modal-background">
        <div className="close-btn">
          <button onClick={modalContext?.closeModal}>X</button>
        </div>
        <ModalComponent />
      </div>
    </div>
  );
};

export default ModalContainer;
