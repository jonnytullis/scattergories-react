import React, { useState } from 'react'
import { ExitToApp } from '@material-ui/icons'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import useStyles from './LeaveGameButton.styles'

export default function LeaveGameButton({ isHost, onLeave }) {
  const classes = useStyles()
  const [ dialogOpen, setDialogOpen ] = useState(() => false)
  return (
    <div>
      <Button variant="contained" className={classes.leaveButton} onClick={() => {setDialogOpen(true)}}>
        {isHost ? 'End' : 'Leave'} Game &nbsp;
        <ExitToApp />
      </Button>
      <Dialog open={dialogOpen} className={classes.dialog} onClose={() => {setDialogOpen(false)}}>
        <DialogTitle>
          Are you sure?
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {isHost ? 'End the game for everyone' : 'Leave the game'}
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="space-between">
            <Button variant="contained" onClick={() => {setDialogOpen(false)}}>
              Back
            </Button>
            <Button variant="contained" onClick={() => {onLeave()}} className={classes.leaveButton}>
              {isHost ? 'End Game' : 'Leave'}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  )
}
