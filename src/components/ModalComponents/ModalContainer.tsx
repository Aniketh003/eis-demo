import { useContext, useEffect } from "react";
import ModalComponent from "./ModalComponent";
import { ModalContext } from "../../context/ModalProvider";
import { useTheme } from "@mui/material/styles";

const ModalContainer = () => {
  const modalContext = useContext(ModalContext);
  const theme = useTheme();

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
    <div className={`${modalContext?.modalOpen && `open`} modal  ${theme.palette.mode === "dark" && "dark"}`}>
      <div className="close-btn">
        <button onClick={modalContext?.closeModal}>X</button>
      </div>
      <div
        className={`modal-background ${theme.palette.mode === "dark" && "dark"}`}
      >
        <ModalComponent />
      </div>
    </div>
  );
};

export default ModalContainer;
