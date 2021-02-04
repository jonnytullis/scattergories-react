import {gql} from '@apollo/client'

export const JOIN_GAME = gql`
    mutation($gameId:String!, $userName:String) {
        joinGame(gameId:$gameId, userName:$userName) {
            game {
                id
                name
                letter
                hostId
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
            game {
                id
                name
                letter
                hostId
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
            user {
                id
                name
            }
        }
    }
`
