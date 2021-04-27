import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Tooltip, TextField
} from '@material-ui/core'
import { FileCopyOutlined, PersonAdd } from '@material-ui/icons'

import useStyles from './InviteFriends.styles'
import { useAlert } from '../../../hooks'

export default function InviteFriends({ gameId }) {
  const classes = useStyles()
  const { raiseAlert } = useAlert()
  const [ dialog, setDialog ] = useState(() => false)
  const [ joinUrl, setJoinUrl ] = useState(() => '')
  const joinLinkText = useRef()

  useEffect(() => {
    let url = `${window.location.origin}?joinCode=${gameId}`
    setJoinUrl(url)
  }, [])

  function copyToClipboard() {
    try {
      const input = joinLinkText.current.getElementsByTagName('input')[0]
      input.select()
      document.execCommand('copy')
      input.blur() // Don't keep text highlighted

      raiseAlert({
        message: 'Copied!',
        severity: 'info'
      })
    } catch(e) {
      raiseAlert({
        message: 'Unable to copy',
        severity: 'error'
      })
    }
  }

  return (
    <>
      <Button
        startIcon={<PersonAdd />}
        color="inherit"
        onClick={() => setDialog(true)}
      >
        Invite Friends
      </Button>
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogTitle>
          Invite Friends
        </DialogTitle>
        <DialogContent>
          Copy and share this link to invite others to join
          <div className={classes.copyTextContainer}>
            <Tooltip title="Copy" placement="top">
              <IconButton size="small" onClick={copyToClipboard}>
                <FileCopyOutlined onClick={() => {}} />
              </IconButton>
            </Tooltip>
            <TextField ref={joinLinkText} value={joinUrl} label="Join Link" className={classes.copyText} />
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-around' }}>
          {/*<IconButton>*/}
          {/*  <Email />*/}
          {/*</IconButton>*/}
          {/*<IconButton>*/}
          {/*  <ChatBubble />*/}
          {/*</IconButton>*/}
          {/*<IconButton>*/}
          {/*  <Facebook />*/}
          {/*</IconButton>*/}
        </DialogActions>
      </Dialog>
    </>
  )
}
