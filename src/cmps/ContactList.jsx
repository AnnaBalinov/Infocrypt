import { ContactPreview } from "./ContactPreview";
import { LoadingSpinner } from '../cmps/LoadingSpinner'

export function ContactList({ contacts, onTransferCoins }) {

    if (!contacts) return <LoadingSpinner />

    return (
        <div className="contact-list scrollbar">
            {contacts.map(contact =>
                <ContactPreview key={contact._id} contact={contact} onTransferCoins={onTransferCoins} />
            )}
        </div>
    )
}