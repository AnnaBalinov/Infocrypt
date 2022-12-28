import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLoggedInUser } from '../store/actions/userActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../services/userService.js'
import { LoadingSpinner } from '../cmps/LoadingSpinner'

export function TransferFunds(props) {

    const [coins, setCoins] = useState(0)
    const [isTransOpen, setIsTransOpen] = useState(false)

    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadLoggedInUser())
        // eslint-disable-next-line
    }, [])

    const onTransferCoins = (ev) => {
        ev.preventDefault()
        if (coins === 0 || coins < 0 || coins > loggedInUser.balance) return
        const transaction = userService.makeTransaction('Transfer', coins, 'USD', props.contact.name)
        const userToUpdate = JSON.parse(JSON.stringify(loggedInUser))
        userToUpdate.balance -= +coins
        userToUpdate.transactions.push(transaction)
        dispatch(updateUser(userToUpdate))
        setCoins(0)
        toggleModal()
        props.onTransferCoins(coins, props.contact.name)
    }

    const toggleModal = () => {
        setIsTransOpen(current => !current)
    }

    const handleCoins = ({ target }) => {
        setCoins(target.value)
    }

    if (!loggedInUser || !props.contact) return <LoadingSpinner />

    return (
        <div className="transfer-funds-container">

            {
                isTransOpen ?
                    <div className="transfer-modal">
                        <form onSubmit={onTransferCoins}>
                            <span onClick={toggleModal} className="ex-btn">
                                <span className="material-icons">close</span>
                            </span>
                            <label htmlFor="coins">You send
                                <input
                                    type="number"
                                    name="coins"
                                    id="coins"
                                    max={loggedInUser.balance}
                                    min={0}
                                    value={coins}
                                    onChange={handleCoins}
                                />
                            </label>
                            <h2> To {props.contact.name}</h2>

                            <button>SAVE</button>
                        </form>
                    </div>
                    :
                    <button className="transfers-btn" onClick={toggleModal}>
                        <span className="material-icons">paid</span>
                        <span>Transfer</span>
                    </button>
            }
        </div>
    )
}
