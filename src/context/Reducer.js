const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_GAME':
            return {
                ...state,
                game: action.payload
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default Reducer