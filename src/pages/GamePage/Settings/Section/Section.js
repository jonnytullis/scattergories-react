import React from 'react'
import { Divider, Typography } from '@material-ui/core'

import useStyles from './Section.styles'

export default function Section({ title, children }) {
  const classes = useStyles()

  return (
    <section className={classes.section}>
      <div className={classes.title}>
        <Divider className={classes.titleLine} />
        <Typography className={classes.titleText} variant="subtitle2">{title}</Typography>
        <Divider className={classes.titleLine} />
      </div>

      <div className={classes.childrenContainer}>
        {children}
      </div>
    </section>
  )
}
