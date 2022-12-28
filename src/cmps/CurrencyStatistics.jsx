import { LoadingSpinner } from '../cmps/LoadingSpinner'

export function CurrencyStatistics({ currencyData }) {

    if (!currencyData) return <LoadingSpinner />

    return (

        <div className="currency-statistics">

            <div className="currency-pre">
                <div className="currency-icon">
                    <img src={require(`../assets/img/${currencyData.name}.png`)} alt="currency-icon" />
                </div>

                <span className="currency-name">{currencyData.name + ' Price Statistics'}</span>
            </div>

            <div className="currency-data">

                <div className="main">
                    <span className="title">Price</span>
                    <span className="num">
                        <span>$</span>
                        {currencyData.price.usd}
                    </span>
                </div>
                <div className="main">
                    <span className="title">High</span>
                    <span className="num">
                        <span>$</span>
                        {currencyData.high}
                    </span>
                </div>
                <div className="main">
                    <span className="title">Low</span>
                    <span className="num">
                        <span>$</span>
                        {currencyData.low}
                    </span>
                </div>
                <div className="main">
                    <span className="title">Volume</span>
                    <span className="num">
                        <span>$</span>
                        {currencyData.volume}
                    </span>
                </div>
                <div className="main market-cap">
                    <span className="title">Market cap</span>
                    <span className="num">
                        <span>$</span>
                        {currencyData.marketCap.usd}
                    </span>
                </div>
            </div>


        </div>

    )
}