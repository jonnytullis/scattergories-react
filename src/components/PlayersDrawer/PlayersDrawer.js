import React from 'react'
import useStyles from './PlayersDrawer.styles'
import { colors } from '../../theme'
import {Divider, Drawer, IconButton, List, ListItem, Typography} from '@material-ui/core'
import PlayerItem from '../PlayerItem/PlayerItem'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import get from 'lodash.get'
import { useSubscription } from '@apollo/client'
import { PLAYERS_SUBSCRIPTION } from '../../GQL/subscriptions'

export default function PlayersDrawer({ open, onClose, gameId }) {
    const classes = useStyles()

    const playersData = useSubscription(PLAYERS_SUBSCRIPTION, { variables: { gameId } })
    const players = get(playersData, 'data.players', [])

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
                    Participants {players && `(${players.length})`}
                </Typography>
                <IconButton onClick={onClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List>
                <Divider />
                {players.map((person, i) => (
                    <div>
                        <ListItem key={person.id} className={classes.listItem}>
                            <PlayerItem
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