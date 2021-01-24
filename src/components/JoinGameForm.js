import React, {useState} from 'react'
import {Button, Grid, TextField, Typography} from '@material-ui/core'

export default function JoinGameForm({onCancel, onGameJoined}) {
    if (typeof onCancel !== 'function' || typeof onGameJoined !== 'function') {
        throw new Error('Invalid props in JoinGameForm. "onCancel" and "onGameJoined" are required and must be of type Function.')
    }

    const [gameId, setGameId] = useState('')

    function onSubmit(event) {
        event.preventDefault()
        console.log('Making an API call to join the game') // TODO
        onGameJoined()
    }

    return (
        <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
            <Typography variant="subtitle1">
                Enter a Game ID
            </Typography>
            <TextField
                value={gameId}
                variant="outlined"
                type="text"
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
                    } else if (/^[a-zA-Z0-9]{1,6}$/.test(text)) {
                        setGameId(text.toUpperCase())
                    }
                }}
            />
            <Grid container spacing={3} direction="row" style={{ textAlign: 'center', marginTop: 24 }}>
                <Grid item xs={6}>
                    <Button variant="contained" size="large" onClick={onCancel} >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button color="primary" variant="contained" size="large" type="submit">
                        Join
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

function getAlphaOnly(text) {
    if (!text.match(/[a-zA-Z]/)) {
        console.log(text)
        return getAlphaOnly(text.slice(0, text.length - 1))
    }
    return text
}