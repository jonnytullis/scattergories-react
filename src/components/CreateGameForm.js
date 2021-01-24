import React, { useState } from 'react'
import {Container, Button, Grid, Checkbox, TextField} from '@material-ui/core'
import PasswordTextField from './PasswordTextField'

export default function CreateGameForm({onCancel, onGameCreated}) {
    if (typeof onCancel !== 'function' || typeof onGameCreated !== 'function') {
        throw new Error('Invalid props in CreateGameForm. "onCancel" and "onSuccess" are required and must be of type Function.')
    }

    const [hostName, setHostName] = useState('')
    const [gameTitle, setGameTitle] = useState('')
    const [passwordRequired, setPasswordRequired] = useState(false)
    const [password, setPassword] = useState('')

    function onSubmit(event) {
        event.preventDefault()

        // TODO call server to create game here
        console.log({
            hostName,
            gameTitle,
            passwordRequired,
            password
        })
        onGameCreated()
    }

    return (
        <Container style={{ padding: 0, maxWidth: 600 }}>
            <form onSubmit={onSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            type="text"
                            fullWidth
                            label="Your Display Name"
                            variant="outlined"
                            value={hostName}
                            autoFocus
                            onChange={(event) => {
                                setHostName(event.target.value)}
                            }
                            onBlur={(event) => {
                                if (!gameTitle && hostName) {
                                    setGameTitle(`${event.target.value}'s Game`)}
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            type="text"
                            fullWidth
                            label="Game Name"
                            variant="outlined"
                            value={gameTitle}
                            onChange={(event) => {
                                setGameTitle(event.target.value)}
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Checkbox
                            color="primary"
                            onChange={(_, checked) => { setPasswordRequired(checked) }}
                        />
                        Require a password to join
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordTextField
                            fullWidth
                            disabled={!passwordRequired}
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)}
                            }
                        />
                    </Grid>
                    <Grid container spacing={3} direction="row" style={{ textAlign: 'center', marginTop: 24 }}>
                        <Grid item xs={6}>
                            <Button variant="contained" size="large" onClick={() => (onCancel())} >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button color="primary" variant="contained" size="large" type="submit">
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}