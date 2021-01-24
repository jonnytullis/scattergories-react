import React, {useState} from 'react'
import {TextField, Typography} from '@material-ui/core'

export default function JoinGameForm() {
    const [gameId, setGameId] = useState('')

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant="subtitle1">
                Enter a Game ID
            </Typography>
            <TextField
                value={gameId}
                variant="outlined"
                inputProps={{
                    style: {
                        fontSize: 50,
                        textAlign: 'center'
                    }
                }}
                style={{
                    maxWidth: 250
                }}
                autoFocus
                onChange={(e) => {
                    const text = e.target.value
                    if (!text) {
                        setGameId('')
                    } else if (text.match(/[a-zA-Z]/)) {
                        setGameId(text.slice(0, 6).toUpperCase())
                    }
                }}
            />
        </div>
    )
}

function getAlphaOnly(text) {
    if (!text.match(/[a-zA-Z]/)) {
        console.log(text)
        return getAlphaOnly(text.slice(0, text.length - 1))
    }
    return text
}