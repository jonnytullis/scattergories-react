import {gql} from '@apollo/client'

export const GAME_SUBSCRIPTION = gql`
    subscription($gameId:String!) {
        game(gameId:$gameId) {
            name
            letter
            id
            host {
                id
                name
            }
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