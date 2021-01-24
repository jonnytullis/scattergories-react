import React, { useState } from 'react'
import {Container, Button, Grid, Checkbox, TextField} from '@material-ui/core'
import PasswordTextField from './PasswordTextField'
import {useMutation} from '@apollo/client'
import {CREATE_USER, CREATE_GAME} from '../GQL/mutations'

export default function CreateGameForm({onCancel, onGameCreated}) {
    if (typeof onCancel !== 'function' || typeof onGameCreated !== 'function') {
        throw new Error('Invalid props in CreateGameForm. "onCancel" and "onGameCreated" are required and must be of type Function.')
    }

    const [hostName, setHostName] = useState('')
    const [gameTitle, setGameTitle] = useState('')
    const [passwordRequired, setPasswordRequired] = useState(false)
    const [password, setPassword] = useState('')
    const [createUser] = useMutation(CREATE_USER)
    const [createGame] = useMutation(CREATE_GAME)

    async function onSubmit(event) {
        event.preventDefault()
        try {
            const userData = await createUser({ variables: { name: hostName }})
            const gameData = await createGame({ variables: { userId: userData.data.createUser.id}})
            onGameCreated(gameData.data.createGame.id)
        } catch(e) {
            // TODO tell the user something went wrong creating the game
        }
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