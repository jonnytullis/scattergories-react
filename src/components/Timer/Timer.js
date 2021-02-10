import React, { useState, useEffect } from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { Edit, AlarmOn, AlarmOff } from '@material-ui/icons'
import clsx from 'clsx'

import { useTimer } from '../../hooks'
import useStyles from './Timer.styles'
import { useGameContext } from '../../hooks'

export default function Timer({ gameId, userId, secondsTotal }) {
    if (!gameId || !userId) {
        throw new Error('Properties "gameId" and "userId" are required for Timer')
    }
    const {user, game} = useGameContext()
    const {data, error, start, pause, reset} = useTimer(game.id)
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

    const timerActionOptions = {
        variables: {
            gameId,
            userId,
        }
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.clockFont} variant="h1">
                { formattedTime() }
            </Typography>
            <Grid
                container
                direction="row"
                justify="center"
                className={clsx({
                    [classes.hide]: !(user?.id === game?.hostId)
                })}
            >
                <Button
                    color="primary"
                    onClick={() => reset(timerActionOptions)}
                >
                    <AlarmOff />&nbsp; Reset
                </Button>
                <Button
                    color="primary"
                    className={clsx({
                        [classes.hide]: running
                    })}
                    onClick={() => start(timerActionOptions)}
                >
                    <AlarmOn />&nbsp; { seconds < secondsTotal ? 'Resume' : 'Start' }
                </Button>
                <Button
                    color="primary"
                    className={clsx({
                        [classes.hide]: !running
                    })}
                    onClick={() => pause(timerActionOptions)}
                >
                    <AlarmOff />&nbsp; Pause
                </Button>
            </Grid>
        </div>
    )
}
