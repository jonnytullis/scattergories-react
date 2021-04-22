import React, { useState } from 'react'
import useStyles from './JoinGameForm.styles'
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core'
import { Check } from '@material-ui/icons'

export default function JoinGameForm({ onCancel, onSubmit }) {
  const classes = useStyles()
  if (typeof onCancel !== 'function' || typeof onSubmit !== 'function') {
    throw new Error('Invalid props in JoinGameForm. "onCancel" and "onGameJoined" are required and must be of type Function.')
  }

  const [ gameId, setGameId ] = useState('')
  const [ loading, setLoading ] = useState(() => false)
  const [ userName, setUserName ] = useState(
    window.localStorage.getItem('userName') ||
    window.localStorage.getItem('hostName') ||
    ''
  )

  function isValidInput() {
    const validGameId = !!gameId && gameId.length === 6
    const validName = !!userName && userName.length >= 2
    return validGameId && validName
  }

  async function onFormSubmit(event) {
    event.preventDefault()
    window.localStorage.setItem('userName', userName)
    setLoading(true)
    await onSubmit({ gameId, userName })
    setLoading(false)
  }

  return (
    <form onSubmit={onFormSubmit} className={classes.center}>
      <Typography variant="subtitle1">
                Enter a Game ID
      </Typography>
      <TextField
        value={gameId}
        variant="outlined"
        type="text"
        inputProps={{ className: classes.gameIdInput }}
        autoFocus
        onChange={(e) => {
          const text = e.target.value
          if (!text) {
            setGameId('')
          } else if (/^[a-zA-Z0-9]{1,6}$/.test(text)) {
            setGameId(text.toUpperCase())
          }
        }}
      />
      <br />
      <TextField
        value={userName}
        label="Display Name"
        variant="outlined"
        type="text"
        size="small"
        className={classes.nameInput}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Grid container spacing={3} direction="row" className={classes.buttonRow}>
        <Grid item xs={6}>
          <Button size="large" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            color="primary"
            disabled={!isValidInput()}
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Check />}
            size="large"
            type="submit"
          >
            Join
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
