import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Card,
  Button
} from '@material-ui/core'
import { Group, ExitToApp } from '@material-ui/icons'
import { useSubscription, useMutation, useQuery } from '@apollo/client'

import useStyles from './GamePage.styles'
import { useAlert } from '../../hooks'
import { LetterView, Timer, PromptsView, PlayersDrawer, LoadingOverlay } from '../../components'
import { GAME_SUBSCRIPTION } from '../../GQL/subscriptions'
import { LEAVE_GAME, NEW_LETTER } from '../../GQL/mutations'
import { USER } from '../../GQL/query'

export default function GamePage({ match }) {
  const { userId, gameId } = match.params

  const classes = useStyles()
  const history = useHistory()
  const { raiseAlert } = useAlert()
  const [ exitMessage, setExitMessage ] = useState(() => 'You left the game')
  const [ exitNow, setExitNow ] = useState(() => false)
  const [ drawerOpen, setDrawerOpen ] = useState(() => true)
  const [ leaveGame ] = useMutation(LEAVE_GAME)
  const [ getNewLetter ] = useMutation(NEW_LETTER)
  const [ game, setGame ] = useState(() => null)
  const [ user, setUser ] = useState(() => null)
  const { data: userData, loading: userLoading, error: userError } = useQuery(USER, {
    variables: { gameId, userId }
  })
  const { data: gameData, error: subscriptionError } = useSubscription(GAME_SUBSCRIPTION, {
    variables: { gameId, userId }
  })

  useEffect(() => {
    // Warn the user before leaving the browser page
    // window.onbeforeunload = () => true
    return function beforeUnmount() {
      // leaveGame({ variables: { gameId, userId } }).catch(() => {})
      // if (exitMessage) {
      //   raiseAlert({ milliseconds: 6000, message: exitMessage, severity: 'info' })
      // }
      // window.onbeforeunload = undefined // Don't need this anymore
    }
  }, [ raiseAlert, exitMessage, leaveGame ])

  useEffect(() => {
    if (subscriptionError) {
      console.log('ERROR:', subscriptionError)
      raiseAlert({
        message: "We're having trouble connecting...",
        severity: 'error'
      })
    }
  }, [ subscriptionError, raiseAlert ])

  useEffect(() => {
    if (userData && !userLoading && !userError) {
      setUser(userData.user)
    }
  }, [ userData, userLoading, userError ])

  useEffect(() => {
    const game = gameData?.gameUpdated?.game
    const status = gameData?.gameUpdated?.status
    if (game) {
      setGame(game)
      document.title += game.name ? ` | ${game.name}` : ''
    }
    if (status) {
      exitGame(status.message)
    }
  }, [ gameData, setGame ])

  useEffect(() => {
    if (exitNow) {
      history.push('/')
    }
  }, [ exitNow, setExitNow ])

  const exitGame = (message) => {
    if (message !== undefined) {
      setExitMessage(message)
    }
    setExitNow(true)
  }

  const handleNewLetter = () => {
    getNewLetter({ variables: { gameId: game?.id, userId: user?.id } }).catch(() => {})
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const isHost = () => userId === game.hostId

  return (
    <div>
      {game && user && <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, drawerOpen && classes.hide)}
            >
              <Group />
            </IconButton>
            <Typography variant="h6" noWrap>
              {game.name}
            </Typography>
            <div className={classes.spacer} />
            <Button variant="contained" className={classes.leaveButton}>
              {isHost() ? 'End' : 'Leave'} Game &nbsp;
              <ExitToApp />
            </Button>
          </Toolbar>
        </AppBar>
        <PlayersDrawer players={game.players} hostId={game.hostId} open={drawerOpen} onClose={handleDrawerClose} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          <div className={classes.contentHeader} />
          <Grid container spacing={2} direction="row" className={classes.pageLayout}>
            <Grid item>
              <Grid container direction="column" spacing={2} justify="center">
                <Grid item>
                  <Card className={classes.card}>
                    <LetterView letter={game.letter} isHost={isHost()} onNewLetter={handleNewLetter} />
                  </Card>
                </Grid>
                <Grid item>
                  <Card className={classes.card}>
                    <Timer gameId={game.id} userId={user.id} hostId={game.hostId} secondsTotal={game.settings?.timerSeconds} />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <PromptsView prompts={game.prompts} />
              </Card>
            </Grid>
          </Grid>
        </main>
      </div>}
      <LoadingOverlay open={userLoading || !gameData} />
    </div>
  )
}
