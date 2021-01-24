import React, { useState } from 'react'
import './HomePage.css'
import {Grid, Container, Box, Button, Dialog, DialogTitle, DialogContent} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {colors} from '../../theme'
import Logo from '../../assets/images/scattergories-logo.png'
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
        history.push(`/game/${gameId}`)
    }

    const history = useHistory()
    return (
        <Container style={{ padding: `${window.innerHeight / 16}px 12px`, maxHeight: `${window.innerHeight}px` }}>
            <Box display="flex">
                <Box m="auto" style={{ boxShadow: '5px 8px 18px #888888', borderRadius: 50 }}>
                    <img src={Logo} style={{ marginBottom: -5, height: 300 }}  alt="Logo" />
                </Box>
            </Box>
            <Box display="flex" style={{ margin: '24px 0' }}>
                <Box m="auto">
                    <Typography variant="h4">
                        Let's play Scattergories!
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
                <DialogContent style={{ height: 350 }}>
                    {dialogType === options.create ?
                        <CreateGameForm onCancel={() => {setDialog(false)}} onGameCreated={goToGame} />
                        :
                        <JoinGameForm />
                    }

                </DialogContent>
            </Dialog>
        </Container>
    )
}