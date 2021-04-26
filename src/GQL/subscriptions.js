import { gql } from '@apollo/client'

export const GAME_SUBSCRIPTION = gql`
    subscription($gameId:ID!) {
        gameUpdated(gameId:$gameId) {
            gameUpdate {
                letter
                players {
                    id
                    name
                    color
                }
                prompts {
                    hidden
                    list
                }
                settings {
                    timerSeconds
                    numPrompts
                }
                timer {
                    seconds
                    isRunning
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
