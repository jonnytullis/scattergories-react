import { gql } from '@apollo/client'

export const USER = gql`
    query($gameId:String!, $userId:ID!) {
        user(gameId:$gameId, userId:$userId) {
            id
            name
        }
    }
`
