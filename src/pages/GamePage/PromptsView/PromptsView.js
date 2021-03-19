import React from 'react'
import useStyles from './PromptsView.styles'

export default function PromptsView({ prompts }) {
  const classes = useStyles()

  return (
    <div>
      {prompts.map((text, index) => {
        return (
          <div className={classes.lineContainer} key={text}>
            <div className={classes.lineNumber}>
              {index + 1}.
            </div>
            { text }
          </div>
        )
      })}
    </div>
  )
}
