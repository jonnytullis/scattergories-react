import React, { useState, useEffect } from 'react'
import { Button, IconButton, Typography, Grid } from '@material-ui/core'
import { Pause, AlarmOn, AlarmOff, Refresh, NotificationsActiveOutlined, NotificationsOffOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import { useMutation } from '@apollo/client'

import { useAlert } from '../../hooks'
import useStyles from './Timer.styles'
import soundFileTicking from '../../assets/sounds/ticking.mp3'
import soundFileAlarm from '../../assets/sounds/bell.mp3'
import EditTime from './EditTime/EditTime'
import { PAUSE_TIMER, RESET_TIMER, START_TIMER } from '../../GQL/mutations'

// Declare audio outside of react lifecycle
const tickingAudio = new Audio(soundFileTicking)
const alarmAudio = new Audio(soundFileAlarm)

export default function Timer({ isHost, timer, secondsTotal, onSecondsUpdate, onStart, onStop }) {
  const [ startTimer ] = useMutation(START_TIMER)
  const [ pauseTimer ] = useMutation(PAUSE_TIMER)
  const [ resetTimer ] = useMutation(RESET_TIMER)
  const { raiseAlert } = useAlert()
  const [ soundsOn, setSoundsOn ] = useState(() => window.localStorage.getItem('soundsOn') !== 'false')
  const classes = useStyles()

  /** Manage audio sounds for timer **/
  useEffect(() => {
    // Ticking sound
    if (tickingAudio.paused && timer.isRunning && timer.seconds <= 10) {
      tickingAudio.currentTime = tickingAudio.duration - timer.seconds
      tickingAudio.play()
    } else if (!timer.isRunning && !tickingAudio.paused) {
      tickingAudio.pause()
    }

    // Alarm sound
    if (timer.isRunning && timer.seconds <= 0) {
      alarmAudio.play()
    }
  }, [ timer.isRunning, timer.seconds ])

  useEffect(() => {
    if (timer.isRunning && typeof onStart === 'function') {
      onStart(timer.seconds)
    }
    if (!timer.isRunning && typeof onStop === 'function') {
      onStop(timer.seconds)
    }
  }, [ timer, onStart, onStop ])

  /** Respond to sound options **/
  useEffect(() => {
    if (soundsOn) {
      tickingAudio.volume = 1
      alarmAudio.volume = 1
    } else {
      tickingAudio.volume = 0
      alarmAudio.volume = 0
    }

    window.localStorage.setItem('soundsOn', String(soundsOn))
  }, [ soundsOn ])

  function formattedTime() {
    const minutes = Math.floor(timer.seconds / 60)
    const remainingSeconds = (timer.seconds % 60)
    return `${minutes}:${remainingSeconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`
  }

  function isPaused() {
    return !timer.isRunning && timer.seconds > 0 && timer.seconds < secondsTotal
  }

  function doTimerAction(action) {
    if (typeof action === 'function') {
      action().catch(() => {
        raiseAlert({
          severity: 'error',
          message: 'We ran into an error with the timer. Please try again.',
          duration: 6000
        })
      })
    }
  }

  async function onUpdate(seconds) {
    await onSecondsUpdate(seconds)
    doTimerAction(resetTimer)
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
        <IconButton color="primary" onClick={() => { setSoundsOn(!soundsOn) }} className={classes.soundBtnHost} >
          {soundsOn ? <NotificationsActiveOutlined /> : <NotificationsOffOutlined />}
        </IconButton> :
        <Button color="primary" onClick={() => { setSoundsOn(!soundsOn) }}>
          {soundsOn ? 'Sound' : 'Muted'}&nbsp;
          {soundsOn ? <NotificationsActiveOutlined /> : <NotificationsOffOutlined />}
        </Button>
      }
      {isHost &&
        <EditTime className={classes.editBtn} seconds={secondsTotal} disabled={timer.isRunning} onUpdate={onUpdate} />
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
            onClick={() => {doTimerAction(resetTimer)}}
          >
            <Refresh />&nbsp; Reset
          </Button>
        </Grid>
        <Grid item xs={6} className={clsx({ [classes.hide]: timer.seconds <= 0 })}>
          <Button
            color="primary"
            className={clsx({
              [classes.hide]: timer.isRunning
            })}
            onClick={() => {doTimerAction(startTimer)}}
          >
            <AlarmOn />&nbsp; { timer.seconds < secondsTotal ? 'Resume' : 'Start' }
          </Button>
          <Button
            color="primary"
            className={clsx({
              [classes.hide]: !timer.isRunning
            })}
            onClick={() => {doTimerAction(pauseTimer)}}
          >
            <AlarmOff />&nbsp; Pause
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
