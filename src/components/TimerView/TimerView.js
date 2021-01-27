import React from 'react'
import useStyles from './TimerView.styles'
import {Button, Typography} from '@material-ui/core'
import {Edit} from '@material-ui/icons'

export default function TimerView({ seconds }) {
    const classes = useStyles()

    function formattedTime() {
        const minutes = seconds / 60
        const remainingSeconds = (seconds % 60)
        return `${minutes}:${remainingSeconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}`
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.clockFont} variant="h1">
                { formattedTime() }
            </Typography>
            <Button color="primary">
                <Edit /> &nbsp; Edit
            </Button>
        </div>
    )
}
