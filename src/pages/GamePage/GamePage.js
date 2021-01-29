import React, { useState, useContext, useEffect } from 'react'
import {Context} from '../../context/Store'
import useStyles from './GamePage.styles'
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
import { useSubscription } from '@apollo/client'
import {LetterView, TimerView, PromptsView, PlayersDrawer} from '../../components'
import {GAME_SUBSCRIPTION} from '../../GQL/subscriptions'

export default function GamePage() {
    const classes = useStyles()
    const history = useHistory()
    const {state, dispatch} = useContext(Context)
    const [drawerOpen, setDrawerOpen] = useState(true)

    // Warn the user before leaving the browser page
    useEffect(() => {
        window.onbeforeunload = (event) => true
        return function beforeUnmount() {
            console.log('User is leaving the game!!!')
            window.onbeforeunload = undefined // Don't need this anymore
        }
    }, [])

    // Subscribe to game changes
    try {
        const res = useSubscription(GAME_SUBSCRIPTION, { variables: { gameId: state.game.id } })
        const game = res.data.game
        dispatch({ type: 'SET_GAME', payload: game })
    } catch(e) {
        console.error('Failed to subscribe to game')
        console.error(e)
    }

    // Leave the page if the context store has not been updated properly
    // This won't happen if someone creates or joins the game, it will only
    // happen if they happen to navigate to a game URL with a valid game ID
    if (!state.game || !state.user) {
        history.push('/')
        return null
    }

    const players = []

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
                        {state.game.name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <PlayersDrawer players={players} open={drawerOpen} onClose={handleDrawerClose} />
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
                                    <TimerView seconds={180} />
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