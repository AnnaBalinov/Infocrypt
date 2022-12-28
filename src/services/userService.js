import { storageService } from './storageService.js'
import moment from 'moment'

const USERS_KEY = 'users'
const USER_KEY = 'loggedinUser'

export const userService = {
    query,
    updateUser,
    makeTransaction,
    getEmptyUser,
    signUp,
}

function query() {
    const user = _setDefaultUser()
    return Promise.resolve({ ...user })
}

function updateUser(user) {
    storageService.store(USER_KEY, user)
    return Promise.resolve({ ...user })
}

function makeTransaction(type, price, symbol = 'USD', to = '') {

    return {
        id: _makeId(),
        date: moment(Date.now()).format("MMM Do"),
        type,
        price,
        symbol,
        to,
    }
}

function _setDefaultUser() {
    let user = storageService.load(USER_KEY)

    if (!user) {

        user = {
            id: 'U1',
            username: 'Guest User',
            password: '123',
            wallet: 'iHACaN2wD4U54cZkP8j',
            balance: 9480,
            transactions: [
                {
                    id: '12B',
                    type: 'Buy',
                    Partner: '',
                    symbol: 'BTC',
                    price: 1800,
                    date: moment(Date.now()).format("MMM Do"),
                },
                {
                    id: '12C',
                    type: 'Sell',
                    Partner: '',
                    symbol: 'BTC',
                    price: 22400,
                    date: moment(Date.now()).format("MMM Do"),
                },
                {
                    id: '12A',
                    type: 'Transfer',
                    Partner: 'Anna Balinov',
                    symbol: 'USD',
                    price: 800,
                    date: moment(Date.now()).format("MMM Do"),
                },
            ],
        }

        storageService.store(USER_KEY, user)
    }

    return user
}


function signUp(user) {
    const { username, password } = user
    return new Promise((resolve, reject) => {

        if (password && username) {
            const newUser = {
                _id: _makeId(),
                wallet: _makeId(20),
                username,
                password,
                balance: 0,
                transactions: [],
            }

            let users = storageService.load(USERS_KEY) || [];
            users.push(newUser)
            storageService.store(USERS_KEY, users)
            
            login(newUser)
            resolve(newUser)

        } else return reject('One or more fields are missing')
    })
}

function login(userLogin) {
    const { username, password } = userLogin
    if (username && password) {

        return new Promise((resolve, reject) => {
            const users = storageService.load(USERS_KEY);
            let user = users.filter(user => (user.username === username && user.password === password))

            if (user.length) {
                storageService.store(USER_KEY, ...user)
                resolve('resolved')

            } else reject('Invalid user')
        })
        
    } else return 'Missing fields'
}

function getEmptyUser() {
    return {
        _id: _makeId(),
        wallet: _makeId(20),
        username: '',
        password: '',
        balance: 0,
        transactions: [],
    }
}

function _makeId(length = 4) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
