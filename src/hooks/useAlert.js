import { useContext } from 'react'
import { AlertContext } from '../context/AlertContext'

export default function useAlert() {
    const { raiseAlert } = useContext(AlertContext)
    return { raiseAlert }
}