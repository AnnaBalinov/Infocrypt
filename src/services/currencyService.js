import axios from "axios"
import moment from 'moment';
import { storageService } from './storageService.js'

export const currencyService = {
    getCurrencyData,
    getCurrencyExchangeRate,
}

async function getCurrencyData(currency = 'bitcoin') {
    try {
        const STORAGE_KEY = `${currency}Data`
        const currentDate = moment().format('L')
        let currencyData = storageService.load(STORAGE_KEY)
        if (!currencyData || currencyData.lestUpdated !== currentDate) {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${currency}?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false`)

            currencyData = {
                name: res.data.id.toLowerCase(),
                symbol: res.data.symbol,
                price: {
                    usd: _setNumber(res.data.market_data.current_price.usd),
                    changePercent: res.data.market_data["price_change_percentage_24h"]
                },
                high: _setNumber(res.data.market_data.high_24h.usd),
                low: _setNumber(res.data.market_data.low_24h.usd),
                marketCap: {
                    usd: _setNumber(res.data.market_data.market_cap.usd),
                    changePercent: res.data.market_data["market_cap_change_percentage_24h"]
                },
                volume: _setNumber(res.data.market_data.total_volume.usd),
                lestUpdated: moment().format('L'),
            }

            storageService.store(STORAGE_KEY, currencyData)
        }

        return currencyData

    } catch (error) {
        throw error
    }
}


async function getCurrencyExchangeRate(currency = 'bitcoin') {
    try {
        const STORAGE_KEY = `${currency}ExchangeRate`
        let currencyExchangeRate = storageService.load(STORAGE_KEY)
        if (!currencyExchangeRate) {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=14&interval=daily`)
            res.data.prices.length = 7
            currencyExchangeRate = res.data.prices.map((data) => {
                return {
                    date: moment(data[0]).format("MMM Do"),
                    price: data[1],
                }
            })
            storageService.store(STORAGE_KEY, currencyExchangeRate)
        }
        return currencyExchangeRate
    } catch (error) {
        throw error
    }
}

function _setNumber(num) {
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    return internationalNumberFormat.format(num)
}

// async function getCryptoNews(coin = 'bitcoin') {
//     const options = {
//         method: 'GET',
//         url: 'https://free-news.p.rapidapi.com/v1/search',
//         params: { q: coin, lang: 'en' },
//         headers: {
//             'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
//             'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
//         }
//     };

//     try {
//         const res = await axios.request(options)
//         return res.data
//     } catch (error) {
//         throw error
//     }
// }