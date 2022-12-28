import { LoadingSpinner } from '../cmps/LoadingSpinner'

export function TransactionsList({ transactionsList }) {

    const setNumber = (num) => {
        const internationalNumberFormat = new Intl.NumberFormat('en-US')
        return internationalNumberFormat.format(num)
    }

    const setPrice = (num, type) => {
        if (type === 'Deposit' || type === 'Sell') {
            // eslint-disable-next-line
            return '+ ' + '$' + setNumber(num)
        } else {
            // eslint-disable-next-line
            return '- ' + '$' + setNumber(num)
        }
    }

    const setColor = (type) => {
        if (type === 'Deposit' || type === 'Sell') {
            return 'positive price'
        } else {
            return 'negative price'
        }
    }

    if (!transactionsList) return <LoadingSpinner />

    return (
        <div className="transactions-cmp">
            <span className="title">Transactions History</span>
            <div>
                {transactionsList && transactionsList.map((transaction) => (
                    <ul className="transaction-container" key={transaction.id}>
                        <li>{transaction.date}</li>
                        <li className="type">{transaction.type}</li>
                        <li>{transaction.symbol}</li>
                        <li className={setColor(transaction.type)}>
                            {setPrice(transaction.price, transaction.type)
                            }</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}