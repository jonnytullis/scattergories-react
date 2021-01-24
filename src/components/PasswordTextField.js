import React, { useState } from 'react'
import {InputAdornment, TextField} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'

export default function PasswordTextField({ value, disabled, fullWidth, onChange = ()=>{} }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <TextField
            margin="dense"
            fullWidth={fullWidth}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            disabled={disabled}
            value={value}
            onChange={onChange}
            InputProps={{
                endAdornment: disabled ? null : (
                    <InputAdornment
                        position="start"
                        style={{
                            cursor: disabled ? '': 'pointer',
                            color: '#afafaf',
                        }}
                    >
                        {showPassword ?
                            <VisibilityOff onClick={() => {setShowPassword(false)}} />
                            :
                            <Visibility onClick={() => {setShowPassword(true)}} />
                        }
                    </InputAdornment>
                )
            }}
        />
    )
}