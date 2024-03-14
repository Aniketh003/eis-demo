import { useContext, useEffect } from "react";
import ModalComponent from "./ModalComponent";
import { ModalContext } from "../context/ModalProvider";

const ModalContainer = () => {
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        modalContext?.closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalContext?.modalOpen]);

  return (
    <div className={`${modalContext?.modalOpen && `open`} modal`}>
      <div className="close-btn">
        <button onClick={modalContext?.closeModal}>X</button>
      </div>
      <div
        className="modal-background"
      >
        <ModalComponent />
      </div>
    </div>
  );
};

export default ModalContainer;
