import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Hidden,
  Card,
} from '@material-ui/core'
import { Group } from '@material-ui/icons'
import { useSubscription, useMutation, useQuery } from '@apollo/client'

import { useAlert } from '../../hooks'
import { LoadingOverlay } from '../../components'
import { GAME_SUBSCRIPTION } from '../../GQL/subscriptions'
import {
  LEAVE_GAME,
  NEW_LETTER,
  UPDATE_SETTINGS
} from '../../GQL/mutations'
import { USER } from '../../GQL/query'

import useStyles from './GamePage.styles'
import PromptsView from './PromptsView/PromptsView'
import LeaveGameButton from './LeaveGameButton/LeaveGameButton'
import PlayersDrawer from './PlayersDrawer/PlayersDrawer'
import LetterView from './LetterView/LetterView'
import Timer from './Timer/Timer'

export default function GamePage({ match }) {
  const classes = useStyles()
  const history = useHistory()
  const { raiseAlert } = useAlert()

  // State
  const [ drawerOpen, setDrawerOpen ] = useState(() => window.localStorage.getItem('playersDrawerOpen') !== 'false')
  const [ game, setGame ] = useState(() => null)
  const [ user, setUser ] = useState(() => null)
  const [ isTimerRunning, setIsTimerRunning ] = useState(() => false)

  // GQL
  const [ getNewLetter ] = useMutation(NEW_LETTER)
  const [ updateSettings ] = useMutation(UPDATE_SETTINGS)
  const [ leaveGame ] = useMutation(LEAVE_GAME)
  const { data: userData, loading: userLoading, error: userError } = useQuery(USER)
  const { data: gameData, error: subscriptionError } = useSubscription(GAME_SUBSCRIPTION, {
    variables: { gameId: match.params.gameId }
  })

  const goToHome = useCallback(message => {
    if (message) {
      raiseAlert({
        message,
        severity: 'info',
      })
    }
    history.replace('/')
  }, [ history, raiseAlert ])

  useEffect(() => {
    if (subscriptionError) {
      const message = subscriptionError?.message?.toLowerCase()
      if (message?.includes('unauthorized') || message?.includes('not found')) {
        goToHome()
      } else {
        raiseAlert({
          message: "We're having trouble connecting...",
          severity: 'warning',
        })
      }
    }
  }, [ subscriptionError, raiseAlert, goToHome ])

  /** Use local storage to remember drawer open state **/
  useEffect(() => {
    window.localStorage.setItem('playersDrawerOpen', String(drawerOpen))
  }, [ drawerOpen ])

  useEffect(() => {
    if (userData && !userLoading && !userError) {
      setUser(userData.user)
    }
  }, [ userData, userLoading, userError ])

  useEffect(() => {
    const newGame = gameData?.gameUpdated?.game
    const status = gameData?.gameUpdated?.status

    if (newGame) {
      setGame(newGame)
      document.title = newGame.name || 'Scattergories'
    }

    if (status?.ended) {
      goToHome(status.message)
    } else if (status?.message) {
      raiseAlert({
        message: status.message,
        severity: 'info',
      })
    }
  }, [ gameData, goToHome, setGame, raiseAlert ])

  function handleNewLetter() {
    getNewLetter().catch(() => {
      raiseAlert({
        message: 'Error getting new letter',
        severity: 'error',
      })
    })
  }

  // Will update any props that are included
  async function handleUpdateSettings(settings) {
    await updateSettings({ variables: { settings } }).catch(() => {
      raiseAlert({
        message: 'Error updating settings',
        severity: 'error',
      })
    })
  }

  async function handleTimerSettingsUpdate(seconds) {
    await handleUpdateSettings({ timerSeconds: seconds })
  }

  function handleTimerStop() {
    setIsTimerRunning(false)
  }

  function handleTimerStart() {
    setIsTimerRunning(true)
  }

  const isHost = useMemo(() => {
    return user && game && user.id === game.hostId
  }, [ game, user ])

  return (
    <div>
      {game && user && <div className={classes.wrapper}>
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
              onClick={() => {setDrawerOpen(true)}}
              edge="start"
              className={clsx(classes.menuButton, drawerOpen && classes.hide)}
            >
              <Group />
            </IconButton>
            <Hidden xsDown>
              <Typography variant="h6" noWrap>{game.name}</Typography>
            </Hidden>
            <div className={classes.spacer} />
            <LeaveGameButton isHost={isHost} onLeave={async () => {
              await leaveGame().catch()
              goToHome(isHost ? 'You ended the game' : 'You left the game')
            }} />
          </Toolbar>
        </AppBar>
        <PlayersDrawer
          players={game.players}
          hostId={game.hostId}
          userId={user.id}
          open={drawerOpen}
          onClose={() => {setDrawerOpen(false)}}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          <div className={classes.contentHeader} />
          <Hidden smUp>
            <Typography variant="h5" className={classes.mobileTitle}>{game.name}</Typography>
          </Hidden>
          <Grid container spacing={2} direction="row" className={classes.pageLayout}>
            <Grid item>
              <Grid container direction="column" spacing={2} justify="center">
                <Grid item>
                  <Card className={classes.card}>
                    <LetterView letter={game.letter} isHost={isHost} disabled={isTimerRunning} onNewLetter={handleNewLetter} />
                  </Card>
                </Grid>
                <Grid item>
                  <Card className={classes.card}>
                    <Timer
                      isHost={isHost}
                      timer={game.timer}
                      secondsTotal={game.settings?.timerSeconds}
                      onSecondsUpdate={handleTimerSettingsUpdate}
                      onStart={handleTimerStart}
                      onStop={handleTimerStop}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Card className={clsx(classes.card, classes.promptsWrapper)}>
                <PromptsView
                  prompts={game.prompts.list}
                  hidden={game.prompts.hidden}
                  isHost={isHost}
                  disabled={isTimerRunning}
                />
              </Card>
            </Grid>
          </Grid>
        </main>
      </div>}
      <LoadingOverlay open={userLoading} />
    </div>
  )
}
