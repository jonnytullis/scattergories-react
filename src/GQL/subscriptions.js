import {gql} from '@apollo/client'

export const GAME_SUBSCRIPTION = gql`
    subscription($gameId:String!) {
        game(gameId:$gameId) {
            id
            name
            letter
            settings {
                timerSeconds
                numPrompts
                numRounds
            }
            host {
                id
                name
            }
            players {
                id
                name
            }
        }
    }
`