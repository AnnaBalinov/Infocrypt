import { useEffect, useState } from 'react'
import { currencyService } from '../services/currencyService.js'
import { LoadingSpinner } from '../cmps/LoadingSpinner'
import { CurrencyStatistics } from '../cmps/CurrencyStatistics'
import { Chart } from '../cmps/Chart'

export function CryptoPage() {

    const [currencyData, setCurrencyData] = useState(null)
    const [currencyRates, setCurrencyRates] = useState([])

    useEffect(() => {
        getCurrencyData()
        getCurrencyRates()
    }, [])

    const getCurrencyData = async () => {
        try {
            const data = await currencyService.getCurrencyData()
            setCurrencyData(data)
        } catch (error) {
            console.log('error:', error)
        }
    }

    const getCurrencyRates = async () => {
        try {
            const data = await currencyService.getCurrencyExchangeRate()
            setCurrencyRates(data)
        } catch (error) {
            console.log('error:', error)
        }
    }

    if (!currencyData) return <LoadingSpinner />

    return (
        <div className="crypto-container scrollbar">

            <CurrencyStatistics currencyData={currencyData} />

            <Chart prop={currencyRates} />

        </div>

    )
}


