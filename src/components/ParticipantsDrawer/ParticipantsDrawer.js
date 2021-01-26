import React from 'react'
import useStyles from './ParticipantsDrawer.styles'
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import ParticipantItem from '../ParticipantItem/ParticipantItem'

export default function ParticipantsDrawer({ participants, open }) {
    const classes = useStyles()

    return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
            paper: classes.drawerPaper,
        }}
    >
        <Toolbar />
        <div className={classes.drawerContainer}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ParticipantItem name={text} />
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    </Drawer>
    )
}