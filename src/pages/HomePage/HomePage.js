import React, { useState } from 'react'
import { Grid, Container, Box, Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { useAlert } from '../../hooks'
import useStyles from './HomePage.styles'
import LogoImage from '../../assets/images/logo-image.png'
import LogoText from '../../assets/images/logo-text.gif'
import { CreateGameForm, JoinGameForm } from '../../components'
import { CREATE_GAME, JOIN_GAME } from '../../GQL/mutations'

export default function HomePage() {
  const classes = useStyles()
  const history = useHistory()
  const { raiseAlert } = useAlert()
  const [ dialog, setDialog ] = useState(false)
  const [ dialogTitle, setDialogTitle ] = useState('')
  const [ dialogType, setDialogType ] = useState('')
  const [ createGame ] = useMutation(CREATE_GAME)
  const [ joinGame ] = useMutation(JOIN_GAME)

  const dialogTypes = { create: 'CREATE', join: 'JOIN' }

  function createGameClicked() {
    setDialogTitle('Host a Game')
    setDialogType(dialogTypes.create)
    setDialog(true)
  }

  async function createGameFormSubmitted({ hostName, gameName }) {
    try {
      const res = await createGame({ variables: { hostName, gameName } })
      const { gameId, userId, sessionId } = res.data?.createGame
      window.localStorage.setItem('sessionId', sessionId)
      goToGame({ gameId, userId })
    } catch(e) {
      raiseAlert({
        message: 'Oops! Something went wrong when creating your game. Please try again.',
        milliseconds: 6000,
        severity: 'error'
      })
    }
  }

  function joinGameClicked() {
    setDialogTitle('Join a Game')
    setDialogType(dialogTypes.join)
    setDialog(true)
  }

  async function joinGameFormSubmitted({ gameId, userName }) {
    try {
      const res = await joinGame({ variables: { gameId, userName } })
      const { userId, sessionId } = res.data?.joinGame
      window.localStorage.setItem('sessionId', sessionId)
      if (gameId && userId) {
        goToGame({ gameId, userId })
      }
    } catch(e) {
      raiseAlert({
        message: 'Oops! Something went wrong when joining the game. Please try again.',
        milliseconds: 9000,
        severity: 'error'
      })
    }
  }

  function goToGame({ gameId, userId }) {
    history.push(`/game/${userId}/${gameId}`)
  }

  return (
    <Container className={classes.container}>
      <Box>
        <Box m="auto" className={classes.center}>
          <img src={LogoText} className={classes.logoText} alt="Scattergories" />
          <Box className={classes.logoImage}>
            <img src={LogoImage} className={classes.logoImageWrapper}  alt="Logo" />
          </Box>
          <Typography variant="h5">
            This is a subtitle if needed
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
      <Dialog open={dialog} style={{ outline: 'none' }} onClose={() => {setDialog(false)}}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent className={classes.dialog}>
          {dialogType === dialogTypes.create ?
            <CreateGameForm onCancel={() => {setDialog(false)}} onSubmit={createGameFormSubmitted} />
            :
            <JoinGameForm onCancel={() => {setDialog(false)}} onSubmit={joinGameFormSubmitted} />}
        </DialogContent>

      </Dialog>
    </Container>
  )
}
