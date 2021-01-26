import React from 'react'
import useStyles from './ParticipantsDrawer.styles'
import { colors } from '../../theme'
import {Divider, Drawer, IconButton, List, ListItem, Typography} from '@material-ui/core'
import ParticipantItem from '../ParticipantItem/ParticipantItem'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

export default function ParticipantsDrawer({ open, onClose }) {
    const classes = useStyles()
    const participants = [
        {
            name: 'Michael Tullis',
            id: '123'
        },
        {
            name: 'Jonny Boy',
            id: '4456'
        },
        {
            name: 'Tipzone',
            id: '789'
        },
        {
            name: 'I am your father',
            id: 'abc'
        }
    ]


    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <Typography className={classes.title} variant="subtitle1">
                    Participants {participants && `(${participants.length})`}
                </Typography>
                <IconButton onClick={onClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List>
                <Divider />
                {participants.map((person, i) => (
                    <div>
                        <ListItem key={person.id} className={classes.listItem}>
                            <ParticipantItem
                                person={person}
                                color={colors.avatarColors[i % colors.avatarColors.length]} // Cycle through avatar colors
                            />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </Drawer>
    )
}