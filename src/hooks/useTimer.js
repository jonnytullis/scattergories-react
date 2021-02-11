import {useMutation, useSubscription} from '@apollo/client'
import { TIMER_SUBSCRIPTION } from '../GQL/subscriptions'
import { PAUSE_TIMER, RESET_TIMER, START_TIMER } from '../GQL/mutations'

export default function useTimer(gameId) {
    const { data, error, loading } = useSubscription(TIMER_SUBSCRIPTION, {
        variables: { gameId }
    })
    const [start] = useMutation(START_TIMER)
    const [pause] = useMutation(PAUSE_TIMER)
    const [reset] = useMutation(RESET_TIMER)

    return {
        data,
        error,
        loading,
        start,
        pause,
        reset,
    }
}