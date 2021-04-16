import React, { useState, useMemo, useEffect } from 'react'
import { TextField } from '@material-ui/core'

export default function InputNumPrompts({ numPrompts, setNumPrompts, setError }) {
  const [ input, setInput ] = useState(() => numPrompts)

  const MIN_NUM = 3
  const MAX_NUM = 20

  const numPromptsError = useMemo(() => {
    if(Number(input) > MAX_NUM) {
      return '20 Maximum'
    } else if(Number(input) < MIN_NUM) {
      return '3 Minimum'
    }
    return ''
  }, [ input ])

  useEffect(() => {
    if (!numPromptsError) {
      setError(false)
      setNumPrompts(Number(input))
    } else {
      setError(true)
    }
  }, [ input, numPromptsError, setError, setNumPrompts ])

  return (
    <>
      <TextField
        value={input}
        margin="dense"
        fullWidth
        type="number"
        label="Number of Prompts"
        variant="outlined"
        error={!!numPromptsError}
        helperText={numPromptsError || ' '}
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
