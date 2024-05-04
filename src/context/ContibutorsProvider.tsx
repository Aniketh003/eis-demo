import { ReactNode, createContext, useState } from "react";

interface ModalContextProps {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    openModal: () => void,
    closeModal: () => void,
}

export const ContributorsModalContext = createContext<ModalContextProps | undefined>(undefined);

interface modalProvider {
    children: ReactNode
}

const ContributorsModalProvider: React.FC<modalProvider> = ({ children }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const openModal = () => {
        console.log("Modal open")
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const contextValue: ModalContextProps = {
        modalOpen,
        closeModal,
        openModal,
        setModalOpen
    }
    return (
        <ContributorsModalContext.Provider value={contextValue}>
            {children}
        </ContributorsModalContext.Provider>
    )
}

export default ContributorsModalProvider
