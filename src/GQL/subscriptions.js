import { gql } from '@apollo/client'

export const GAME_SUBSCRIPTION = gql`
    subscription($gameId:String!) {
        game(gameId:$gameId) {
            id
            name
            letter
            hostId
            players {
                id
                name
            }
            settings {
                timerSeconds
                numPrompts
                numRounds
            }
        }
    }
`

export const TIMER_SUBSCRIPTION = gql`
    subscription($gameId:String!) {
        timer(gameId:$gameId) {
            remaining
            seconds
            isRunning
        }
    }
`