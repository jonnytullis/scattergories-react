import { useSubscription } from '@apollo/client'
import { TIMER_SUBSCRIPTION } from '../GQL/subscriptions'

export default function useTimer(gameId) {
    const { data, error } = useSubscription(TIMER_SUBSCRIPTION, {
        variables: { gameId }
    })
    return { data, error }
}