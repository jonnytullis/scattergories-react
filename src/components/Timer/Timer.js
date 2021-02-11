import React, { useState, useEffect } from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { Pause, AlarmOn, AlarmOff, Refresh } from '@material-ui/icons'
import clsx from 'clsx'

import { useTimer, useAlert } from '../../hooks'
import useStyles from './Timer.styles'
import { useGameContext } from '../../hooks'

export default function Timer({ gameId, userId, secondsTotal }) {
    if (!gameId || !userId) {
        throw new Error('Properties "gameId" and "userId" are required for Timer')
    }
    const {user, game} = useGameContext()
    const {data, error, start, pause, reset} = useTimer(game.id)
    const {raiseAlert} = useAlert()
    const [seconds, setSeconds] = useState(() => secondsTotal)
    const [running, setRunning] = useState(() => false)
    const classes = useStyles()

    // Update the view when data from the subscription changes
    useEffect(() => {
        if (data) {
            setSeconds(data.timer?.remaining)
            setRunning(data.timer?.isRunning)
        } else if (error) {
            console.error('Oh no! There\'s an issue with the timer!', error)
        }
    }, [data, error])

    function formattedTime() {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = (seconds % 60)
        return `${minutes}:${remainingSeconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}`
    }

    function isPaused() {
        return !running && seconds > 0 && seconds < secondsTotal
    }

    function doTimerAction(action) {
        if (typeof action === 'function') {
            action({ variables: { gameId, userId }}).catch(() => {
                raiseAlert({ severity: 'error', message: 'We ran into an error with the timer. Please try again.'})
            })
        }
    }

    return (
        <div className={classes.center}>
            <div className={ classes.pausedTextContainer }>
                <div className={clsx(classes.pausedText, {[classes.hide]: !isPaused()})}>
                    <Pause /> Paused
                </div>
            </div>
            <Typography className={classes.clockFont} variant="h1">
                { formattedTime() }
            </Typography>
            <Grid
                container
                direction="row"
                justify="center"
                className={clsx({[classes.hide]: !(user?.id === game?.hostId)}, classes.grid)}
            >
                <Grid item xs={6}>
                    <Button
                        color="primary"
                        onClick={() => doTimerAction(reset)}
                    >
                        <Refresh />&nbsp; Reset
                    </Button>
                </Grid>
                <Grid item xs={6} className={clsx({[classes.hide]: seconds <= 0})}>
                    <Button
                        color="primary"
                        className={clsx({
                            [classes.hide]: running
                        })}
                        onClick={() => doTimerAction(start)}
                    >
                        <AlarmOn />&nbsp; { seconds < secondsTotal ? 'Resume' : 'Start' }
                    </Button>
                    <Button
                        color="primary"
                        className={clsx({
                            [classes.hide]: !running
                        })}
                        onClick={() => doTimerAction(pause)}
                    >
                        <AlarmOff />&nbsp; Pause
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
