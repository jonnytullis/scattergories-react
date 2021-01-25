import React from 'react'
import {ListItem, ListItemText, Avatar} from '@material-ui/core'

export default function ParticipantItem({ name }) {
    return (
        <ListItem button>
            <Avatar style={{ marginRight: 10 }}>
                KC
            </Avatar>
            <ListItemText>{name}</ListItemText>
        </ListItem>
    )
}