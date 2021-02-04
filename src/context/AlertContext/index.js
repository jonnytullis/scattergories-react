import React, { createContext, useState } from 'react'
import { Alert } from '../../components'

export default function AlertProvider({ children }) {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState({
        message: '',
        severity: 'success',
        milliseconds: 6000
    })

    const contextValue = {
        raiseAlert: ({ message, severity, milliseconds }) => {
            setOptions({
                message: message || severity || 'success',
                severity: severity || 'success',
                milliseconds: milliseconds || 6000
            })
            setOpen(true)
        }
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