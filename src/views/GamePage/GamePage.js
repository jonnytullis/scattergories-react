import React from 'react'

export default function GamePage({ match }) {
    return (<h1>Game Page {match.params.gameId}</h1>)
}