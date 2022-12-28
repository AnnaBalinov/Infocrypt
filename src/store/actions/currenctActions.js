import { currencyService } from "../../services/currencyService"

export function getCurrencyData(currency) {
    return async (dispatch) => {
        try {
            const data = await currencyService.getCurrencyData(currency)
            dispatch({ type: 'SET_CURRENCY_DATA', data })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
