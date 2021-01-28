import {gql} from '@apollo/client'

export const CREATE_USER = gql`
    mutation($name:String) {
        createUser(name: $name) {
            id
            name
        }
    }
`

export const CREATE_GAME = gql`
    mutation($userId:ID!) {
        createGame(userId: $userId) {
            success
            game {
                id
                name
                host
                players
                letter
                settings
            }
        }
    }
`
