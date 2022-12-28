import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { contactService } from '../services/contactService'
import { updateContact, removeContact } from '../store/actions/contactActions'
import { LoadingSpinner } from '../cmps/LoadingSpinner'
import { ToastContainer, toast } from 'react-toastify'

export function ContactEditPage(props) {

  const [contactToEdit, setContactToEdit] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    loadContact()
    // eslint-disable-next-line
  }, [])

  const loadContact = async () => {
    const { id } = params
    const contact = id ? await contactService.getById(id) : contactService.getEmptyContact()
    setContactToEdit(contact)
  }

  const onUpdateInfo = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setContactToEdit((prevState) => ({ ...prevState, [field]: value }))
  }

  const onSaveContact = (ev) => {
    ev.preventDefault()
    dispatch(updateContact({ ...contactToEdit }))
    setInfoMsg(`${contactToEdit.name} is saved`)
    // props.history.push('/contact')
  }

  const onRemoveContact = () => {
    const id = params.id
    dispatch(removeContact(id))
    props.history.push('/contact')
  }

  const setInfoMsg = (msg) => {
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

  if (!contactToEdit) return <LoadingSpinner />

  return (
    <div className="edit-contact-container">
      <ToastContainer />

      <div className="contact-container">
        <div className="contact-img">
          <img src=
            {contactToEdit._id ? contactToEdit.image : require(`../assets/img/new-contact.png`)}
            alt="contact" />
        </div>
        <form onSubmit={onSaveContact}
          className="contact-info">
          <h2>{contactToEdit._id ? 'Edit' : 'Add'} Contact</h2>
          <label htmlFor="name">Name
            <input
              onChange={onUpdateInfo}
              type="text"
              name="name"
              value={contactToEdit.name}
              required />
          </label>

          <label htmlFor="email">Email
            <input
              onChange={onUpdateInfo}
              type="email"
              name="email"
              value={contactToEdit.email}
              required />
          </label>

          <label htmlFor="phone">Phone
            <input
              onChange={onUpdateInfo}
              type="text"
              name="phone"
              value={contactToEdit.phone}
              required />
          </label>

          <button>
            <span className="material-icons">save_alt</span>
            <span>Save</span>
          </button>
        </form>
        <div className="action">
          <Link to={`/contact/${contactToEdit._id}`}>
            <button className="back-btn">
              <span className="material-icons">arrow_back_ios</span>
              <span>Back</span>
            </button>
          </Link>
          <button className="delete-btn" onClick={onRemoveContact}>
            <span className="material-icons">delete</span>
            <span>Delete</span>
          </button>
        </div>
      </div>

    </div>
  )
}
