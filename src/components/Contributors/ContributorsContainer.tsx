import { useTheme } from '@mui/material/styles'
import { useContext } from 'react'
import { ContributorsModalContext } from '../../context/ContibutorsProvider';
import ContributorsComponent from './ContributorsComponent';
import './Contributors.css'

const ContributorsContainer = () => {
    const theme = useTheme();
    const modalContext = useContext(ContributorsModalContext);
    return (
        <div className={`${modalContext?.modalOpen && `open`} modal  ${theme.palette.mode === "dark" && "dark"}`}>
            <div className="close-btn">
                <button onClick={modalContext?.closeModal}>X</button>
            </div>
            <div className={`contributors-modal-background ${theme.palette.mode === "dark" && "dark"}`}>
                <ContributorsComponent />
            </div>
        </div>
    )
}

export default ContributorsContainer
