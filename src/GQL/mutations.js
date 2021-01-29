import {gql} from '@apollo/client'

export const JOIN_GAME = gql`
    mutation($gameId:String!, $userName:String) {
        joinGame(gameId:$gameId, userName:$userName) {
            success
            game {
                id
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
    }
`

export const CREATE_GAME = gql`
    mutation($hostName:String!, $gameName:String!) {
        createGame(hostName:$hostName, gameName:$gameName) {
            success
            game {
                id
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
    }
`
