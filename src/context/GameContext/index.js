import React, {createContext, useState} from 'react'

export default function GameProvider({ children }) {
    const [game, setGame] = useState(null)
    const [user, setUser] = useState(null)

    const gameState = {
        game: game,
        setGame: setGame,
        user: user,
        setUser: setUser
    }

    return (
        <GameContext.Provider value={gameState}>
            {children}
        </GameContext.Provider>
    )
}

export const GameContext = createContext({
    game: null,
    setGame: () => {},
    user: null,
    setUser: () => {}
})