import { contactService } from '../../services/contactService.js'

export function loadContacts() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().contactModule
            const contacts = await contactService.query(filterBy)
            dispatch({ type: 'SET_CONTACTS', contacts })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeContact(contactId) {
    return async dispatch => {
        try {
            await contactService.remove(contactId)
            dispatch({ type: 'REMOVE_CONTACT', contactId })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function updateContact(contact) {
    return async dispatch => {
        try {
            await contactService.save(contact)
            dispatch({ type: 'UPDATE_CONTACT', contact })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function getContact(contactId) {
    return async dispatch => {
        try {
            const contact = await contactService.getById(contactId)
            dispatch({ type: 'SET_CONTACT', contact })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

