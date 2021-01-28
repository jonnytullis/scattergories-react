import {gql} from '@apollo/client'

export const PLAYERS_SUBSCRIPTION = gql`
    subscription($gameId:String!) {
        players(gameId: $gameId) {
            name
            id
        }
    }
`