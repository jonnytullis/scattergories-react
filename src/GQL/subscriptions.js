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
                    color
                }
                prompts
                settings {
                    timerSeconds
                    numPrompts
                    numRounds
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
    subscription($gameId:String!) {
        timer(gameId:$gameId) {
            remaining
            seconds
            isRunning
        }
    }
`
