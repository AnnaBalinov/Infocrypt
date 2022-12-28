import { useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import copy from 'copy-to-clipboard'

export function Wallet({ user, addToBalance }) {

    const [isWalletFront, setIsWalletFront] = useState(true)
    const [balance, setBalance] = useState(0)

    const setNumber = (num) => {
        const internationalNumberFormat = new Intl.NumberFormat('en-US')
        return internationalNumberFormat.format(num)
    }

    const copyToClipboard = () => {
        copy(user.wallet)
        alert(`Copied`)
    }

    const flipWallet = () => {
        setIsWalletFront(current => !current)
    }

    const handleBalance = ({ target }) => {
        setBalance(target.value)
    }

    const onAddBalance = () => {
        if (balance === 0 || balance < 0 || balance > 10000) return

        addToBalance(balance)

        setBalance(0)
        flipWallet()
    }

    if (!user) return <LoadingSpinner />

    return (
        <div className="wallet-main">

            <div className="wallet-container">

                {isWalletFront ?
                    <div className="wallet-front">
                        <span className="title-1">WALLET</span>
                        <div className="balance-container">
                            <span className="title-2">Balance</span>
                            <span className="number">${setNumber(user.balance)}</span>
                        </div>
                        <span onClick={copyToClipboard} className="id">{user.wallet}
                            <span className="material-icons">
                                content_copy
                            </span>
                        </span>
                    </div>
                    :
                    <div className="wallet-back">
                        <h2>Add to balance</h2>
                        <div className='inp-btn'>
                            <input type="number" placeholder={balance}
                                value={balance} onChange={handleBalance} min={0} max={10000}></input>
                            <button onClick={onAddBalance}>
                                <span className="material-icons">add</span>
                            </button>
                        </div>
                        <p>Max $10,000</p>
                    </div>
                }

            </div>

            <div className="add-balance-container">
                <button onClick={flipWallet}>
                    {isWalletFront ?
                        <div className="flip-btn">
                            <span className="material-icons">paid</span>
                            <span>ADD TO BALANCE</span>
                        </div>
                        :
                        <div className="flip-btn">
                            <span className="material-icons">account_balance_wallet</span>
                            <span>BACK TO WALLET</span>
                        </div>
                    }
                </button>
            </div>
        </div>
    )
}

