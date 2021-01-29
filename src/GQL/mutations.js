import {gql} from '@apollo/client'

export const JOIN_GAME = gql`
    mutation($gameId:String!, $userName:String) {
        joinGame(gameId:$gameId, userName:$userName) {
            success
            game {
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
            user {
                id
                name
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
            user {
                id
                name
            }
        }
    }
`
