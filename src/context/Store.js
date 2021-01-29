import React, { createContext, useReducer, useState } from 'react'
import Reducer from './Reducer'

const initialState = {
    game: null,
    user: null
}

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState)
export default Store