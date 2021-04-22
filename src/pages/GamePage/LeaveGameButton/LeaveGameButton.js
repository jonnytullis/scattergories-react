import React, { useState } from 'react'
import { ExitToApp } from '@material-ui/icons'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from '@material-ui/core'
import { useMutation } from '@apollo/client'

import useStyles from './LeaveGameButton.styles'
import { LEAVE_GAME } from '../../../GQL/mutations'
import { useAlert } from '../../../hooks'

export default function LeaveGameButton({ isHost, onLeave, disabled }) {
  const classes = useStyles()
  const [ dialogOpen, setDialogOpen ] = useState(() => false)
  const [ loading, setLoading ] = useState(() => false)
  const { raiseAlert } = useAlert()
  const [ leaveGame ] = useMutation(LEAVE_GAME)

  async function handleLeaveGame() {
    setLoading(true)
    try {
      await leaveGame()
      onLeave()
    } catch(e) {
      raiseAlert({
        message: `Error ${isHost ? 'ending' : 'leaving'} the game. Please try again.`,
        severity: 'error',
      })
    }
    setLoading(false)
  }

  return (
    <div>
      <Button
        disabled={disabled}
        variant="contained"
        className={classes.leaveButton}
        classes={{ disabled: classes.disabledButton }}
        endIcon={<ExitToApp />}
        onClick={() => {setDialogOpen(true)}}
      >
        {isHost ? 'End' : 'Leave'} Game
      </Button>
      <Dialog open={!disabled && dialogOpen} className={classes.dialog} onClose={() => {setDialogOpen(false)}}>
        <DialogTitle>
          Are you sure?
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {isHost ? 'You will be ending the game for everyone' : 'Leave the game'}
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="space-between">
            <Button onClick={() => {setDialogOpen(false)}}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleLeaveGame}
              className={classes.leaveButton}
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ExitToApp />}
            >
              {isHost ? 'End Game' : 'Leave'}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  )
}
