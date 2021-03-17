import React from 'react'
import useStyles from './LoadingOverlay.styles'
import { Backdrop, CircularProgress } from '@material-ui/core'

export default function LoadingOverlay({ open }) {
  const classes = useStyles()

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
