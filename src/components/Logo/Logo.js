/* eslint-disable */
import React from 'react'
import { Box } from '@material-ui/core'

import useStyles from './Logo.styles'

export default function Logo() {
  const classes = useStyles()

  return (
    <>
      <Box m="auto" className={classes.circle}>
        <Box className={classes.text}>
          Scattergories
        </Box>
      </Box>
    </>
  )
}
