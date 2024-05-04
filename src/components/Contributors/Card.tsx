import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import './Contributors.css'
import "./ContibutorsImages/Dathrao.jpg"
import { dataProps } from './ContributorsComponent';

interface CardProps {
    Contributor: dataProps
}

const Card: React.FC<CardProps> = ({ Contributor }) => {
    return (
        <div className="card">
            <div className="image-container">
                <img src={`src/components/Contributors/ContibutorsImages/${Contributor.img}`} alt={Contributor.name} />
            </div>
            <div className="info-container">
                <h4>{Contributor.name}</h4>
                <p className='role'>{Contributor.role}</p>
                <p>Academia 3.0 batch</p>
                <hr />
                <div className="social-links">
                    <a href={Contributor.links.linkedIn} target='_blank'>
                        <LinkedInIcon />
                    </a>
                    <a href={Contributor.links.github} target='_blank'>
                        <GitHubIcon />
                    </a>
                    <a href={`mailto:${Contributor.links.mail}`} target='_blank'>
                        <MailIcon />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card
