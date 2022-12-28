import { useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getContact } from '../store/actions/contactActions'
import { LoadingSpinner } from '../cmps/LoadingSpinner'
import { TransferFunds } from '../cmps/TransferFunds'
import { ToastContainer, toast } from 'react-toastify'

export function ContactDetailsPage() {

    const { currentContact } = useSelector(state => state.contactModule)

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const { id } = params
        dispatch(getContact(id))
        // eslint-disable-next-line
    }, [])

    const onTransferCoins = (coins, contactName) => {
        const msg = `$ ${coins} successfully transferred to  ${contactName}`
        toast.info(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    if (!currentContact) return <LoadingSpinner />

    return (

        <div className="contact-details-container">
            <ToastContainer />

            <div className="contact-container">
                <div className="actions">
                    <Link to={`/contact/`}>
                        <button className="btn">
                            <span className="material-icons">arrow_back_ios</span>
                            <span>Back</span>
                        </button>
                    </Link>
                    <Link to={`/contact/edit/${currentContact._id}`}>
                        <button className="btn">
                            <span className="material-icons">edit</span>
                            <span>Edit</span>
                        </button>
                    </Link>
                    <TransferFunds contact={currentContact} onTransferCoins={onTransferCoins} />
                </div>
                <div className="contact-details">
                    <div className="contact-img">
                        <img src={currentContact.image ? currentContact.image : require(`../assets/img/new-contact.png`)} alt="contact" />
                    </div>
                    <ul className="contact-details-list">
                        <li className="contact-name text">{currentContact.name}</li>
                        <li className="text" alt="Some Image">{currentContact.email}</li>
                        <li className="text">{currentContact.phone}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
