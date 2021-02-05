import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Grid,
    Card
} from '@material-ui/core'
import Group from '@material-ui/icons/Group'
import { useSubscription, useMutation } from '@apollo/client'

import useStyles from './GamePage.styles'
import { useAlert, useGameContext } from '../../hooks'
import { LetterView, Timer, PromptsView, PlayersDrawer } from '../../components'
import { GAME_SUBSCRIPTION } from '../../GQL/subscriptions'

export default function GamePage({ match }) {
    const classes = useStyles()
    const history = useHistory()
    const { game, setGame, user } = useGameContext()
    const { raiseAlert } = useAlert()
    const [drawerOpen, setDrawerOpen] = useState(true)
    const { data: gameData, error: subscriptionError } = useSubscription(GAME_SUBSCRIPTION, {
        variables: { gameId: match.params.gameId }
    })

    // Warn the user before leaving the browser page
    useEffect(() => {
        window.onbeforeunload = (event) => true
        return function beforeUnmount() {
            raiseAlert({ milliseconds: 6000, message: 'You left the game', severity: 'info' })
            console.log('User is leaving the game!!!')
            window.onbeforeunload = undefined // Don't need this anymore
        }
    }, [raiseAlert])

    useEffect(() => {
        if (subscriptionError) {
            raiseAlert({
                milliseconds: 9000,
                message: 'We encountered an error while connecting to the game',
                severity: 'error'
            })
        }
    }, [subscriptionError, raiseAlert])

    useEffect(() => {
        if (gameData) {
            setGame(gameData.game)
        }
    }, [gameData, setGame])

    // Leave the page if the context store has not been updated properly
    // This won't happen if someone creates or joins the game, it will only
    // happen if they happen to navigate to a game URL
    if (!game || !user) {
        history.push('/')
        return null
    }

    const handleDrawerOpen = () => {
        setDrawerOpen(true)
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
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
                </Toolbar>
            </AppBar>
            <PlayersDrawer players={game.players} hostId={game.hostId} open={drawerOpen} onClose={handleDrawerClose} />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: drawerOpen,
                })}
            >
                <div className={classes.contentHeader} />
                <Grid container spacing={3} direction="row">
                    <Grid item>
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Card className={classes.card}>
                                    <Timer gameId={game.id} userId={user.id} secondsTotal={game.settings?.timerSeconds} />
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.card}>
                                    <LetterView letter="A" />
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                        <Card className={classes.card}>
                            <PromptsView
                                prompts={[
                                    'Test1',
                                    'test2',
                                    'test3',
                                    'test4',
                                    'Test5',
                                    'test6',
                                    'test7',
                                    'test8',
                                    'Test9',
                                    'test10',
                                    'test11',
                                    'test12'
                                ]} />
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}