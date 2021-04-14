import React, { createContext, useState, useCallback } from 'react'
import { Alert } from '../../components'

export default function AlertProvider({ children }) {
  const [ open, setOpen ] = useState(false)
  const [ options, setOptions ] = useState({
    message: '',
    severity: 'success'
  })

  const contextValue = {
    raiseAlert: useCallback(({ message, severity }) => {
      if (message) {
        severity = severity?.toLowerCase() || 'success'

        let milliseconds = 6000
        if (severity === 'success') {
          milliseconds = 2000
        } else if (severity === 'info') {
          milliseconds = 3000
        } else if (severity === 'warning') {
          milliseconds = 4000
        } else if (severity === 'error') {
          milliseconds = 6000
        }

        setOptions({
          message,
          severity,
          milliseconds
        })
        setOpen(true)
      }
    }, [])
  }

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <h1>{open}</h1>
      <Alert
        open={open}
        severity={options.severity}
        duration={options.milliseconds}
        message={options.message}
        onClose={() => { setOpen(false) }}
      />
    </AlertContext.Provider>
  )
}

export const AlertContext = createContext({
  raiseAlert: () => {}
})
