import React, { useState } from 'react'
import useStyles from './HomePage.styles'
import { Grid, Container, Box, Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import LogoImage from '../../assets/images/logo-image.png'
import LogoText from '../../assets/images/logo-text.gif'
import { useHistory } from 'react-router-dom'
import { CreateGameForm, JoinGameForm } from '../../components'
import {useMutation} from '@apollo/client'
import {CREATE_GAME, JOIN_GAME} from '../../GQL/mutations'

export default function HomePage() {
    const classes = useStyles()
    const [dialog, setDialog] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('')
    const [dialogType, setDialogType] = useState('')
    const [createGame] = useMutation(CREATE_GAME)
    const [joinGame] = useMutation(JOIN_GAME)

    const dialogTypes = { create: 'CREATE', join: 'JOIN' }

    function createGameClicked() {
        setDialogTitle('Host a Game')
        setDialogType(dialogTypes.create)
        setDialog(true)
    }

    async function createGameFormSubmitted({ hostName, gameName }) {
        try {
            const gameData = await createGame({ variables: { hostName, gameName }})
            const game = gameData.data.createGame.game
            goToGame(game.id)
        } catch(e) {
            console.log('An error occurred while creating the game')
            console.error(e)
            // TODO tell the user something went wrong creating the game
        }
    }

    function joinGameClicked() {
        setDialogTitle('Join a Game')
        setDialogType(dialogTypes.join)
        setDialog(true)
    }

    async function joinGameFormSubmitted({ gameId, userName }) {
        try {
            const gameData = await joinGame({ variables: { gameId, userName }})
            const game = gameData.data.joinGame.game
            goToGame(game.id)
        } catch(e) {
            console.log('An error occurred while joining the game')
            console.error(e)
            // TODO tell the user something went wrong joining the game
        }
    }

    function goToGame(gameId) {
        console.log('Going to game ' + gameId)
        history.push(`/game/${gameId}`)
    }

    const history = useHistory()
    return (
        <Container className={classes.container}>
            <Box>
                <Box m="auto" className={classes.center}>
                    <img src={LogoText} className={classes.logoText} alt="Scattergories" />
                    <Box className={classes.logoImage}>
                        <img src={LogoImage} className={classes.logoImageWrapper}  alt="Logo" />
                    </Box>
                    <Typography variant="h5">
                        Keep your family and friends close while at a distance
                    </Typography>
                </Box>
            </Box>
            <Grid container spacing={5} className={`${classes.center} ${classes.buttonRow}`}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                        variant="contained"
                        className={classes.buttonLarge}
                        color="secondary"
                        onClick={() => {createGameClicked()}}
                    >
                        Create Game
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                        variant="contained"
                        className={classes.buttonLarge}
                        color="primary"
                        onClick={() => {joinGameClicked()}}
                    >
                        Join Game
                    </Button>
                </Grid>
            </Grid>
            <Dialog open={dialog} onClose={() => {setDialog(false)}}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent className={classes.dialog}>
                    {
                        dialogType === dialogTypes.create ?
                        <CreateGameForm onCancel={() => {setDialog(false)}} onSubmit={createGameFormSubmitted} />
                    :
                        <JoinGameForm onCancel={() => {setDialog(false)}} onSubmit={joinGameFormSubmitted} />
                    }
                </DialogContent>

            </Dialog>
        </Container>
    )
}