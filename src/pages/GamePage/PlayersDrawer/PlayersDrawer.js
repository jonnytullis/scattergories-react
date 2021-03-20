import React from 'react'
import useStyles from './PlayersDrawer.styles'
import { Divider, Drawer, IconButton, List, ListItem, Typography } from '@material-ui/core'
import PlayerItem from '../PlayerItem/PlayerItem'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

export default function PlayersDrawer({ open, onClose, players, hostId }) {
  const classes = useStyles()

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
        {players.map(person => (
          <div key={person.id}>
            <ListItem className={classes.listItem}>
              <PlayerItem
                person={person}
                caption={person.id === hostId ? '(Host)' : null}
                color={person.color || '#a5a5a5'}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Drawer>
  )
}
