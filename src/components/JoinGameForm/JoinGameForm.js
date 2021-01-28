import React, {useState} from 'react'
import useStyles from './JoinGameForm.styles'
import {Button, Grid, TextField, Typography} from '@material-ui/core'

export default function JoinGameForm({onCancel, onSubmit}) {
    const classes = useStyles()
    if (typeof onCancel !== 'function' || typeof onSubmit !== 'function') {
        throw new Error('Invalid props in JoinGameForm. "onCancel" and "onGameJoined" are required and must be of type Function.')
    }

    const [gameId, setGameId] = useState('')

    function onFormSubmit(event) {
        event.preventDefault()
        onSubmit({ gameId })
    }

    return (
        <form onSubmit={onFormSubmit} className={classes.center}>
            <Typography variant="subtitle1">
                Enter a Game ID
            </Typography>
            <TextField
                value={gameId}
                variant="outlined"
                type="text"
                inputProps={{ className: classes.input }}
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
            <Grid container spacing={3} direction="row" className={classes.buttonRow}>
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
