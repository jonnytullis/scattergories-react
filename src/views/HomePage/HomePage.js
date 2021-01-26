import React, { useState } from 'react'
import useStyles from './HomePage.styles'
import {Grid, Container, Box, Button, Dialog, DialogTitle, DialogContent} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import LogoImage from '../../assets/images/logo-image.png'
import LogoText from '../../assets/images/logo-text.gif'
import { useHistory } from 'react-router-dom'
import { CreateGameForm, JoinGameForm } from '../../components'

export default function HomePage() {
    const styles = useStyles()
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
        <Container className={styles.container}>
            <Box>
                <Box m="auto" className={styles.center}>
                    <img src={LogoText} className={styles.logoText} alt="Scattergories" />
                    <Box className={styles.logoImage}>
                        <img src={LogoImage} className={styles.logoImageWrapper}  alt="Logo" />
                    </Box>
                    <Typography variant="h5">
                        Keep your family and friends close from a distance ❤️
                    </Typography>
                </Box>
            </Box>
            <Grid container spacing={5} className={`${styles.center} ${styles.buttonRow}`}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                        variant="contained"
                        className={styles.buttonLarge}
                        color="secondary"
                        onClick={() => {createGameClicked()}}
                    >
                        Create Game
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                        variant="contained"
                        className={styles.buttonLarge}
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
                    <DialogContent className={styles.dialogContentCreate}>
                        <CreateGameForm onCancel={() => {setDialog(false)}} onGameCreated={goToGame} />
                    </DialogContent>
                    :
                    <DialogContent className={styles.dialogContentJoin}>
                        <JoinGameForm onCancel={() => {setDialog(false)}} onGameJoined={goToGame} />
                    </DialogContent>
                }

            </Dialog>
        </Container>
    )
}