import React from 'react'
import useStyles from './PromptsView.styles'
import clsx from 'clsx'

export default function PromptsView({ prompts, hidden }) {
  const classes = useStyles()

  return (
    <div>
      {prompts.map((text, index) => {
        return (
          <div className={clsx(classes.lineWrapper, { [classes.blank]: hidden })} key={text}>
            <div className={clsx(classes.line, { [classes.hiddenText]: hidden })}>
              <div className={classes.lineNumber}>
                {index + 1}.
              </div>
              { text }
            </div>
          </div>
        )
      })}
    </div>
  )
}
