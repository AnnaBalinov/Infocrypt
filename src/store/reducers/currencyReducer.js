const INITIAL_STATE = {
    currencyData: null,
}

export function currencyReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CURRENCY_DATA':
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}