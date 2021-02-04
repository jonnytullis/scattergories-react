import React from 'react'
import useStyles from './PlayerItem.styles'
import {Typography, Avatar, Tooltip} from '@material-ui/core'

export default function PlayerItem({ person, caption, color }) {
    const classes = useStyles({ hasCaption: !!caption })

    return (
        <Tooltip title={`${caption ? `${caption} ` : ''}${person.name}`} enterDelay={1000} interactive>
            <div className={classes.container}>
                <Avatar className={classes.avatar} style={{ backgroundColor: color }}>
                    {getInitials(person.name)}
                </Avatar>
                <div className={classes.textWrapper}>
                    <Typography variant="subtitle1" noWrap={true} className={classes.text}>
                        {person.name}
                    </Typography>
                    <Typography variant="caption" className={classes.textCaption}>
                        {caption}
                    </Typography>
                </div>
            </div>
        </Tooltip>
    )
}

function getInitials(name) {
    if (name && name.length > 2) {
        const [first, second] = name.split(/\s+/)
        if (first && second) {
            return `${first.slice(0,1)}${second.slice(0,1)}`.trim().toUpperCase()
        }

        return name.trim().slice(0, 2).toUpperCase()
    }
    return name
}