import React from 'react'
import useStyles from './ParticipantItem.styles'
import {Typography, Avatar} from '@material-ui/core'

export default function ParticipantItem({ person, color }) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Avatar className={classes.avatar} style={{ backgroundColor: color }}>
                {getInitials(person.name)}
            </Avatar>
            <Typography variant="subtitle2" className={classes.text}>
                {person.name}
            </Typography>
        </div>
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