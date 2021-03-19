import React, { useState, useEffect } from 'react'
import { Button, IconButton, Typography, Grid } from '@material-ui/core'
import { Pause, AlarmOn, AlarmOff, Refresh, NotificationsActiveOutlined, NotificationsOffOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import { useTimer, useAlert } from '../../hooks'
import useStyles from './Timer.styles'

import soundFileTicking from '../../assets/sounds/ticking.mp3'
import soundFileAlarm from '../../assets/sounds/bell.mp3'
import EditTime from './EditTime/EditTime'

// Declare audio outside of react lifecycle
const tickingAudio = new Audio(soundFileTicking)
const alarmAudio = new Audio(soundFileAlarm)

export default function Timer({ gameId, userId, hostId, secondsTotal, onSecondsUpdate }) {
  if (!gameId || !userId) {
    throw new Error('Properties "gameId" and "userId" are required for Timer')
  }
  const { data, error, start, pause, reset } = useTimer(gameId)
  const { raiseAlert } = useAlert()
  const [ seconds, setSeconds ] = useState(() => secondsTotal)
  const [ running, setRunning ] = useState(() => false)
  const [ playSounds, setPlaySounds ] = useState(() => window.localStorage.getItem('playTimerSounds') !== 'false')
  const [ isHost ] = useState(() => userId === hostId)
  const classes = useStyles()

  // Update the view when data from the subscription changes
  useEffect(() => {
    if (data) {
      setSeconds(data.timer?.remaining)
      setRunning(data.timer?.isRunning)
    } else if (error) {
      console.error('Oh no! There\'s an issue with the timer!', error)
    }
  }, [ data, error ])

  /** Manage audio sounds for timer **/
  useEffect(() => {
    // Ticking sound
    if (tickingAudio.paused && running && seconds <= 10) {
      tickingAudio.currentTime = tickingAudio.duration - seconds
      tickingAudio.play()
    } else if (!running && !tickingAudio.paused) {
      tickingAudio.pause()
    }

    // Alarm sound
    if (running && seconds <= 0) {
      alarmAudio.play()
    }
  }, [ running, seconds ])

  /** Respond to sound options **/
  useEffect(() => {
    if (playSounds) {
      tickingAudio.volume = 1
      alarmAudio.volume = 1
    } else {
      tickingAudio.volume = 0
      alarmAudio.volume = 0
    }

    window.localStorage.setItem('playTimerSounds', String(playSounds))
  }, [ playSounds ])

  function formattedTime() {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = (seconds % 60)
    return `${minutes}:${remainingSeconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`
  }

  function isPaused() {
    return !running && seconds > 0 && seconds < secondsTotal
  }

  function doTimerAction(action) {
    if (typeof action === 'function') {
      action({ variables: { gameId, userId } }).catch(() => {
        raiseAlert({ severity: 'error', message: 'We ran into an error with the timer. Please try again.' })
      })
    }
  }

  async function onUpdate(seconds) {
    await onSecondsUpdate(seconds)
    doTimerAction(reset)
  }

  return (
    <div className={clsx(classes.center, isHost ? classes.padTop : {})}>
      <div className={ classes.pausedTextContainer }>
        <div className={clsx(classes.pausedText, { [classes.hide]: !isPaused() })}>
          <Pause /> Paused
        </div>
      </div>
      <Typography className={classes.clockFont} variant="h1">
        { formattedTime() }
      </Typography>
      {isHost ?
        <IconButton color="primary" onClick={() => { setPlaySounds(!playSounds) }} className={classes.soundBtnHost} >
          {playSounds ? <NotificationsActiveOutlined /> : <NotificationsOffOutlined />}
        </IconButton> :
        <Button color="primary" onClick={() => { setPlaySounds(!playSounds) }}>
          {playSounds ? 'Sound' : 'Muted'}&nbsp;
          {playSounds ? <NotificationsActiveOutlined /> : <NotificationsOffOutlined />}
        </Button>
      }
      {isHost && !running &&
        <EditTime className={classes.editBtn} seconds={secondsTotal} onUpdate={onUpdate} />
      }
      <Grid
        container
        direction="row"
        justify="center"
        className={clsx({ [classes.hide]: !isHost }, classes.buttonRow)}
      >
        <Grid item xs={6}>
          <Button
            color="primary"
            onClick={() => doTimerAction(reset)}
          >
            <Refresh />&nbsp; Reset
          </Button>
        </Grid>
        <Grid item xs={6} className={clsx({ [classes.hide]: seconds <= 0 })}>
          <Button
            color="primary"
            className={clsx({
              [classes.hide]: running
            })}
            onClick={() => doTimerAction(start)}
          >
            <AlarmOn />&nbsp; { seconds < secondsTotal ? 'Resume' : 'Start' }
          </Button>
          <Button
            color="primary"
            className={clsx({
              [classes.hide]: !running
            })}
            onClick={() => doTimerAction(pause)}
          >
            <AlarmOff />&nbsp; Pause
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
