import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/alert'

export default function Alert({ open, onClose, message, duration, severity }) {
  if (!(onClose instanceof Function)) {
    throw Error('Property onClose is required and must be a function.')
  }

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <MuiAlert onClose={onClose} severity={severity || 'success'} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  )
}