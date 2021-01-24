import React, { useState } from 'react'
import './HomePage.css'
import {Grid, Container, Box, Button, Dialog, DialogTitle, DialogContent} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {colors} from '../../theme'
import LogoImage from '../../assets/images/logo-image.png'
import LogoText from '../../assets/images/logo-text.gif'
import { useHistory } from 'react-router-dom'
import { CreateGameForm, JoinGameForm } from '../../components'

export default function HomePage() {
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
        // history.push(`/game/${gameId}`)
    }

    const history = useHistory()
    return (
        <Container style={{ padding: `${window.innerHeight / 16}px 12px`, maxHeight: `${window.innerHeight}px` }}>
            <Box display="flex" style={{ marginBottom: 36}}>
                <Box m="auto" style={{ textAlign: 'center' }}>
                    <img src={LogoText} className="logo-text" alt="Scattergories" />
                    <Box className="logo-image-wrapper">
                        <img src={LogoImage} style={{ height: '100%' }}  alt="Logo" />
                    </Box>
                    <Typography variant="h5">
                        Keep your family and friends close from a distance ❤️
                    </Typography>
                </Box>
            </Box>
            <Grid container alignItems="center" spacing={3} style={{ textAlign: 'center' }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                        variant="contained"
                        className="Button-Large"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={() => {createGameClicked()}}
                    >
                        Create Game
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                        variant="contained"
                        className="Button-Large"
                        style={{ backgroundColor: colors.primary }}
                        onClick={() => {joinGameClicked()}}
                    >
                        Join Game
                    </Button>
                </Grid>
            </Grid>
            <Dialog open={dialog} onClose={() => {setDialog(false)}}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                {dialogType === options.create ?
                    <DialogContent style={{ height: 350 }}>
                        <CreateGameForm onCancel={() => {setDialog(false)}} onGameCreated={goToGame} />
                    </DialogContent>
                    :
                    <DialogContent style={{ height: 225 }}>
                        <JoinGameForm onCancel={() => {setDialog(false)}} onGameJoined={goToGame} />
                    </DialogContent>
                }

            </Dialog>
        </Container>
    )
}