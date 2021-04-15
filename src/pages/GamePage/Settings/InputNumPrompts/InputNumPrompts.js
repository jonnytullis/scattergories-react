import React, { useState, useCallback } from 'react'
import { TextField } from '@material-ui/core'

export default function InputNumPrompts({ numPrompts }) {
  const [ input, setInput ] = useState(() => numPrompts)

  const MIN_NUM = 3
  const MAX_NUM = 20

  const numPromptsError = useCallback(() => {
    if(Number(input) > MAX_NUM) {
      return '20 Maximum'
    } else if(Number(input) < MIN_NUM) {
      return '3 Minimum'
    }
    return ''
  }, [ input ])

  return (
    <>
      <TextField
        value={input}
        margin="dense"
        fullWidth
        type="number"
        label="Number of Prompts"
        variant="outlined"
        error={!!numPromptsError()}
        helperText={numPromptsError()}
        inputProps={{
          min: MIN_NUM,
          max: MAX_NUM
        }}
        onInput={(event) => {
          setInput(event.target.value)
        }}
      />
    </>
  )
}
