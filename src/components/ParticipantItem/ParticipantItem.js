import React from 'react'
import {ListItem, ListItemText, Avatar} from '@material-ui/core'

export default function ParticipantItem({ name }) {
    return (
        <ListItem button>
            <Avatar>
                KC
            </Avatar>
            <ListItemText>{name}</ListItemText>
        </ListItem>
    )
}