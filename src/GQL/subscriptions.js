import { gql } from '@apollo/client'

export const GAME_SUBSCRIPTION = gql`
    subscription($gameId:String!) {
        gameUpdated(gameId:$gameId) {
            game {
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
            gameEnded {
                gameId
                message
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