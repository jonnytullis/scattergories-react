import { gql } from '@apollo/client'

export const USER = gql`
    query {
        user {
            id
            name
        }
    }
`

export const GAME = gql`
    query {
        game {
            id
            name
            hostId
            players {
                id
                name
                color
            }
            letter
            prompts {
                hidden
                list
            }
            settings {
                numPrompts
                timerSeconds
            }
            timer {
                seconds
                isRunning
            }
        }
    }
`
