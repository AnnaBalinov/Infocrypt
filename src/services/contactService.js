import { storageService } from './storageService.js';

export const contactService = {
    query,
    save,
    remove,
    getById,
    getEmptyContact,
}

const STORAGE_KEY = 'contacts'

const gDefaultContacts = require('../assets/data/contact.json')

var gContacts = _loadContacts()

function query(filterBy = null) {
    let contactsToReturn = gContacts
    if (filterBy) {
        return Promise.resolve(_filter(filterBy, contactsToReturn))
    }
    return Promise.resolve([...contactsToReturn])
}

function getById(id) {
    const contact = gContacts.find(contact => contact._id === id)
    if (contact) return Promise.resolve({ ...contact })
    else return Promise.reject()
}

function save(contactToSave) {
    if (contactToSave._id) {
        const idx = gContacts.findIndex(
            contact => contact._id === contactToSave._id
        )
        gContacts.splice(idx, 1, contactToSave)
    } else {
        contactToSave._id = _makeId()
        gContacts.unshift(contactToSave)
    }
    storageService.store(STORAGE_KEY, gContacts)
    return Promise.resolve(contactToSave)
}

function remove(id) {
    const idx = gContacts.findIndex(contact => contact._id === id)
    gContacts.splice(idx, 1)
    if (!gContacts.length) gContacts = gDefaultContacts.slice()
    storageService.store(STORAGE_KEY, gContacts)
    return Promise.resolve()
}


function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: '',
    }
}

function _loadContacts() {
    let contacts = storageService.load(STORAGE_KEY)
    if (!contacts || !contacts.length) contacts = gDefaultContacts
    storageService.store(STORAGE_KEY, contacts)
    return contacts
}

function _filter(filterBy, contacts) {
    const term = filterBy.toLocaleLowerCase()
    return contacts.filter(contact => {
        return (
            contact.name.toLocaleLowerCase().includes(term) ||
            contact.phone.toLocaleLowerCase().includes(term) ||
            contact.email.toLocaleLowerCase().includes(term)
        )
    })
}

function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}