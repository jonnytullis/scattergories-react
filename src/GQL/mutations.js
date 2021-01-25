import {gql} from '@apollo/client'

export const CREATE_USER = gql`
    mutation($name:String) {
        createUser(name: $name) {
            id
        }
    }
`

export const CREATE_GAME = gql`
    mutation($userId:ID!) {
        createGame(userId: $userId) {
            id
        }
    }
`
