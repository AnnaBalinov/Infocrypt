import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { loadContacts, setFilterBy } from '../store/actions/contactActions'
import { ContactFilter } from "../cmps/ContactFilter"
import { ContactList } from '../cmps/ContactList'
import { LoadingSpinner } from '../cmps/LoadingSpinner'
import { ToastContainer, toast } from 'react-toastify'

export function ContactPage() {

    const { contacts } = useSelector(state => state.contactModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadContacts())
        // eslint-disable-next-line
    }, [])

    const onChangeFilter = useCallback((filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadContacts())
    }, [dispatch])

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

    if (!contacts) return <LoadingSpinner />

    return (

        <section className="contacts-page">
            <ToastContainer />

            <div className="contacts-bar">
                <ContactFilter onChangeFilter={onChangeFilter} />
                <Link className="add-contact-btn" to="/contact/edit">
                    <span className="material-icons">
                        add
                    </span>
                    Add contact </Link>
            </div>
            <ContactList contacts={contacts} onTransferCoins={onTransferCoins} />
        </section>
    )
}

