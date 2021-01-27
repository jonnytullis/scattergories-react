import React from 'react'
import useStyles from './PromptsView.styles'
import {Typography} from '@material-ui/core'

export default function PromptsView({ prompts }) {
    const classes = useStyles()

    return (
        <div>
            {prompts.map((text, index) => {
                return (
                    <div className={classes.lineContainer}>
                        <Typography variant="h5" key={text}>
                            {index + 1}.&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="h6" key={text}>
                            {'\t' + text}
                        </Typography>
                    </div>
                )
            })}
        </div>
    )
}