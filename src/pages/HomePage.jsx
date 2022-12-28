import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/userService.js'
import { updateUser } from '../store/actions/userActions'
import { loadLoggedInUser } from '../store/actions/userActions'
import { TransactionsList } from '../cmps/TransactionsList'
import { LoadingSpinner } from '../cmps/LoadingSpinner'
import { Wallet } from '../cmps/Wallet'
import { ToastContainer, toast } from 'react-toastify'

export function HomePage() {

    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadLoggedInUser())
        // eslint-disable-next-line
    }, [])


    const addToBalance = (balance) => {
        const transaction = userService.makeTransaction('Deposit', balance)
        const userToUpdate = JSON.parse(JSON.stringify(loggedInUser))

        userToUpdate.balance += +balance
        userToUpdate.transactions.push(transaction)

        dispatch(updateUser(userToUpdate))

        const msg = `$ ${balance} added to your balance!`
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


    if (!loggedInUser) return <LoadingSpinner />

    return (
        <div className="home-page scrollbar">
            <ToastContainer />

            <div className="welcome-header">
                <h2>Hello {loggedInUser.username}</h2>
                <h2>Welcome back to Infocrypt</h2>
            </div>
            <div className="main-container">
                <Wallet user={loggedInUser} addToBalance={addToBalance} />
                <TransactionsList transactionsList={loggedInUser.transactions.slice(-3)} />
            </div>
        </div>
    )
}

