import React from 'react'
import useStyles from './LetterView.styles'
import {Button, CardContent, Typography, Grid} from '@material-ui/core'
import LoopIcon from '@material-ui/icons/Loop'

export default function LetterView({ letter }) {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.container}>
                <CardContent>
                    <Typography variant="h1" className={classes.letter}>
                        {letter}
                    </Typography>
                </CardContent>
            </div>
            <div className={classes.buttonContainer}>
                <Button color="primary">
                    <LoopIcon /> &nbsp; New
                </Button>
            </div>
        </div>
    )
}