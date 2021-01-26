import React, { useState } from 'react'
import useStyles from './HomePage.styles'
import {Grid, Container, Box, Button, Dialog, DialogTitle, DialogContent} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import LogoImage from '../../assets/images/logo-image.png'
import LogoText from '../../assets/images/logo-text.gif'
import { useHistory } from 'react-router-dom'
import { CreateGameForm, JoinGameForm } from '../../components'

export default function HomePage() {
    const classes = useStyles()
    const [dialog, setDialog] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('')
    const [dialogType, setDialogType] = useState('')

    const options = { create: 'CREATE', join: 'JOIN' }

    function createGameClicked() {
        setDialogTitle('Host a Game')
        setDialogType(options.create)
        setDialog(true)
    }

    function joinGameClicked() {
        setDialogTitle('Join a Game')
        setDialogType(options.join)
        setDialog(true)
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
                        Keep your family and friends close from a distance ❤️
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
                {dialogType === options.create ?
                    <DialogContent className={classes.dialogContentCreate}>
                        <CreateGameForm onCancel={() => {setDialog(false)}} onGameCreated={goToGame} />
                    </DialogContent>
                    :
                    <DialogContent className={classes.dialogContentJoin}>
                        <JoinGameForm onCancel={() => {setDialog(false)}} onGameJoined={goToGame} />
                    </DialogContent>
                }

            </Dialog>
        </Container>
    )
}