import { ReactNode, createContext, useState } from "react";

interface ModalContextProps{
    modalOpen:boolean,
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
    openModal:(batchName:string) => void,
    closeModal:() => void,
    batchName:string
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface modalProvider{
    children:ReactNode
}

const ModalProvider:React.FC<modalProvider> = ({children}) => {
    const [modalOpen,setModalOpen] = useState<boolean>(false);
    const [batchName,setBatchName] = useState<string>("")

    const openModal = (batch_name:string) => {
        setModalOpen(true);
        setBatchName(batch_name);
    }

    const closeModal = () => {
        setModalOpen(false);
        setBatchName("");
    }

    const contextValue:ModalContextProps = {
        modalOpen,
        closeModal,
        openModal,
        batchName,
        setModalOpen
    }
  return (
    <ModalContext.Provider value={contextValue}>
        {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
