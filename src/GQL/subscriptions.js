import { gql } from '@apollo/client'

export const GAME_SUBSCRIPTION = gql`
    subscription($gameId:ID!) {
        gameUpdated(gameId:$gameId) {
            game {
                id
                name
                letter
                hostId
                players {
                    id
                    name
                    color
                }
                prompts
                settings {
                    timerSeconds
                    numPrompts
                }
            }
            status {
                gameId
                ended
                message
            }
        }
    }
`

export const TIMER_SUBSCRIPTION = gql`
    subscription($gameId:ID!) {
        timer(gameId:$gameId) {
            remaining
            seconds
            isRunning
        }
    }
`
