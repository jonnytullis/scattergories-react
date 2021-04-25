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
import { useSubscription, useQuery } from '@apollo/client'

import { useAlert } from '../../hooks'
import { LoadingOverlay } from '../../components'
import { GAME_SUBSCRIPTION } from '../../GQL/subscriptions'
import { USER } from '../../GQL/query'

import useStyles from './GamePage.styles'
import PromptsView from './PromptsView/PromptsView'
import LeaveGameButton from './LeaveGameButton/LeaveGameButton'
import PlayersDrawer from './PlayersDrawer/PlayersDrawer'
import LetterView from './LetterView/LetterView'
import Timer from './Timer/Timer'
import Settings from './Settings/Settings'

export default function GamePage({ match }) {
  const classes = useStyles()
  const history = useHistory()
  const { raiseAlert } = useAlert()

  // State
  const [ drawerOpen, setDrawerOpen ] = useState(() => {
    return window.localStorage.getItem('playersDrawerOpen') === 'true' || window.innerWidth > 400
  })
  const [ game, setGame ] = useState(() => null)
  const [ user, setUser ] = useState(() => null)
  const [ isTimerRunning, setIsTimerRunning ] = useState(() => false)

  // GQL
  const { data: userData, loading: userLoading, error: userError } = useQuery(USER)
  const { data: gameData, loading: gameLoading, error: gameError } = useSubscription(GAME_SUBSCRIPTION, {
    variables: { gameId: match.params.gameId }
  })

  const isHost = useMemo(() => {
    return user?.id && game?.hostId && user.id === game.hostId
  }, [ game?.hostId, user?.id ])

  const goToHome = useCallback(message => {
    if (message) {
      raiseAlert({
        message,
        severity: 'info',
      })
    }
    history.replace('/')
  }, [ history, raiseAlert ])

  async function doLeaveGame() {
    goToHome(isHost ? 'You ended the game' : 'You left the game')
  }

  useEffect(() => {
    if (gameError) {
      const errorCodes = gameError.graphQLErrors?.map(error => error.extensions?.code?.toUpperCase())
      if (errorCodes?.includes('FORBIDDEN')) {
        goToHome()
      } else {
        raiseAlert({
          message: "We're having trouble connecting...",
          severity: 'warning',
        })
      }
    }
  }, [ gameError, raiseAlert, goToHome ])

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
              className={clsx(drawerOpen && classes.hide)}
            >
              <Group />
            </IconButton>
            {isHost && <Settings settings={game.settings} disabled={isTimerRunning} />}
            <Hidden xsDown>
              <Typography variant="h6" noWrap className={classes.appBarTitle}>{game.name}</Typography>
            </Hidden>
            <div className={classes.spacer} />
            <LeaveGameButton isHost={isHost} onLeave={doLeaveGame} />
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
                    <LetterView letter={game.letter} isHost={isHost} disabled={isTimerRunning} />
                  </Card>
                </Grid>
                <Grid item>
                  <Card className={classes.card}>
                    <Timer
                      isHost={isHost}
                      timer={game.timer}
                      secondsTotal={game.settings?.timerSeconds}
                      onStart={() => setIsTimerRunning(true)}
                      onStop={() => setIsTimerRunning(false)}
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
      <LoadingOverlay open={userLoading || gameLoading} />
    </div>
  )
}
