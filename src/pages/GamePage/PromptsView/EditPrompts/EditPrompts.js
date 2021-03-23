import React, { useState, useCallback, useEffect } from 'react'
import { Button, IconButton, Dialog, DialogActions, DialogTitle, Grid, DialogContent, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import useStyles from './EditPrompts.styles'

export default function EditPrompts({ numPrompts, disabled, className, onUpdate }) {
  const classes = useStyles()
  const [ openDialog, setOpenDialog ] = useState(() => false)
  const [ numPromptsInput, setNumPromptsInput ] = useState(() => numPrompts)

  const MIN_NUM = 3
  const MAX_NUM = 20

  useEffect(() => {
    if (!openDialog) {
      // Allow some time for transition to finish
      setTimeout(resetData, 500)
    }
  }, [ openDialog ])

  function resetData() {
    setNumPromptsInput(numPrompts)
  }

  const numPromptsError = useCallback(() => {
    if(Number(numPromptsInput) > MAX_NUM) {
      return '20 Maximum'
    } else if(Number(numPromptsInput) < MIN_NUM) {
      return '3 Minimum'
    }
    return ''
  }, [ numPromptsInput ])

  async function handleUpdate() {
    if (typeof onUpdate === 'function') {
      await onUpdate({ numPrompts: Number(numPromptsInput) })
      setOpenDialog(false)
    }
  }

  return (
    <>
      <IconButton disabled={disabled} className={className} color="primary" onClick={() => {setOpenDialog(true)}}>
        <Edit />
      </IconButton>
      <Dialog open={openDialog} onEscapeKeyDown={() => {setOpenDialog(false)}}>
        <DialogTitle>Update Prompts</DialogTitle>
        <DialogContent>
          <TextField
            value={numPromptsInput}
            type="number"
            label="Number of Prompts"
            variant="outlined"
            error={!!numPromptsError()}
            helperText={numPromptsError()}
            inputProps={{
              min: MIN_NUM,
              max: MAX_NUM,
              className: classes.numberInput
            }}
            onInput={(event) => {
              setNumPromptsInput(event.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Button onClick={() => {setOpenDialog(false)}}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" disabled={!!numPromptsError()} onClick={handleUpdate}>Update</Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}
