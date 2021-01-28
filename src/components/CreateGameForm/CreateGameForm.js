import React, { useState } from 'react'
import useStyles from './CreateGameForm.styles'
import {Container, Button, Grid, /*Checkbox,*/ TextField} from '@material-ui/core'
// import PasswordTextField from '../PasswordTextField/PasswordTextField'

export default function CreateGameForm({onCancel, onSubmit}) {
    if (typeof onCancel !== 'function' || typeof onSubmit !== 'function') {
        throw new Error('Invalid props in CreateGameForm. "onCancel" and "onGameCreated" are required and must be of type Function.')
    }

    const classes = useStyles()
    const [hostName, setHostName] = useState('')
    const [gameName, setGameName] = useState('')
    // const [passwordRequired, setPasswordRequired] = useState(false)
    // const [password, setPassword] = useState('')

    async function onFormSubmit(event) {
        event.preventDefault()
        onSubmit({
            hostName, gameName
        })
    }

    return (
        <Container className={classes.container}>
            <form onSubmit={onFormSubmit}>
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
                                if (!gameName && hostName) {
                                    setGameName(`${event.target.value}'s Game`)}
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
                            value={gameName}
                            onChange={(event) => {
                                setGameName(event.target.value)}
                            }
                        />
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*    <Checkbox*/}
                    {/*        color="primary"*/}
                    {/*        onChange={(_, checked) => { setPasswordRequired(checked) }}*/}
                    {/*    />*/}
                    {/*    Require a password to join*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12}>*/}
                    {/*    <PasswordTextField*/}
                    {/*        fullWidth*/}
                    {/*        disabled={!passwordRequired}*/}
                    {/*        value={password}*/}
                    {/*        onChange={(event) => {*/}
                    {/*            setPassword(event.target.value)}*/}
                    {/*        }*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid container spacing={3} direction="row" className={classes.buttonRow}>
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