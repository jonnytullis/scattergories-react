import React from 'react'
import { AppBar, Divider, Drawer, IconButton, List, ListItem, Typography } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { useTheme, useMediaQuery } from '@material-ui/core'

import PlayerItem from '../PlayerItem/PlayerItem'
import useStyles from './PlayersDrawer.styles'
import InviteFriends from '../InviteFriends/InviteFriends'

export default function PlayersDrawer({ gameId, open, onClose, players, hostId, userId }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  players.sort((a, b) => b.id === userId ? 1 : b.id === hostId && a.id !== userId ? 1 : -1)

  function getCaption(isHost, isCurrentPlayer) {
    if (isHost && isCurrentPlayer) {
      return 'Me (Host)'
    } else if (isHost) {
      return '(Host)'
    } else if (isCurrentPlayer) {
      return 'Me'
    }
    return ''
  }

  return (
    <Drawer
      className={classes.drawer}
      variant={isMobile ? 'temporary' : 'persistent' }
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={onClose}
    >
      <div className={classes.drawerHeader}>
        <Typography className={classes.title} variant="subtitle1">
          Participants {players && `(${players.length})`}
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List className={classes.list}>
        {players.map(person => (
          <div key={person.id}>
            <ListItem className={classes.listItem}>
              <PlayerItem
                person={person}
                caption={getCaption(person.id === hostId, person.id === userId)}
                color={person.color || '#a5a5a5'}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <AppBar className={classes.footerBar} position="relative">
        <InviteFriends gameId={gameId} />
      </AppBar>
    </Drawer>
  )
}
