import React, { useState, useEffect } from 'react'
import { Button, IconButton, Typography, Grid } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import clsx from 'clsx'
import { useMutation } from '@apollo/client'

import { useTimer } from '../../hooks'
import useStyles from './Timer.styles'
import { useGameContext } from '../../hooks'
import { START_TIMER } from '../../GQL/mutations'

export default function Timer({ gameId, userId, secondsTotal }) {
    if (!gameId || !userId) {
        throw new Error('Properties "gameId" and "userId" are required for Timer')
    }
    const {user, game} = useGameContext()
    const {data, error} = useTimer(game.id)
    const [startTimer] = useMutation(START_TIMER)
    const [seconds, setSeconds] = useState(secondsTotal)
    const classes = useStyles()

    useEffect(() => {
        if (data) {
            setSeconds(data.timer?.remaining)
        } else if (error) {
            console.error('Oh no! There\'s an issue with the timer!', error)
        }
    }, [data, error])

    function formattedTime() {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = (seconds % 60)
        return `${minutes}:${remainingSeconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}`
    }

    function startGameTimer() {
        try {
            startTimer({
                variables: {
                    gameId,
                    userId,
                }
            })
        } catch(e) {
            console.error('Error starting timer:', e)
            // FIXME use an alert here
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
                justify="space-between"
                className={clsx({
                    [classes.hide]: !(user?.id === game?.hostId)
                })}
            >
                <IconButton color="primary">
                    <Edit />
                </IconButton>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => startGameTimer()}
                >
                    Start
                </Button>
            </Grid>
        </div>
    )
}
