const INITIAL_STATE = {
    loggedInUser: null,
    loading: true,
    error: null
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: { ...action.user }
            }
        case 'UPDATE_USER':
            return {
                ...state,
                // users: state.users.map(user => user._id === action.user._id ? action.user : user),
                loggedInUser: { ...action.user }
            }
        default:
            return state;
    }
}