import { Link } from 'react-router-dom'
import { TransferFunds } from '../cmps/TransferFunds'
import { Avatar } from '@mui/material'

export function ContactPreview({ contact, onTransferCoins }) {

    return (
        <div className="contact-preview">
            <Link className="contact-container" to={`/contact/${contact._id}`}>
                <div className="avatar-img">
                    <Avatar alt={contact.name} src="/static/images/avatar/1.jpg" />
                </div>
                <div className="name">
                    <div>{contact.name}</div>
                </div>
            </Link>

            <div className="q-trans-modal">
                <TransferFunds contact={contact} onTransferCoins={onTransferCoins}/>
            </div>
        </div>
    )
}
