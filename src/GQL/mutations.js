import { gql } from '@apollo/client'

export const JOIN_GAME = gql`
    mutation($gameId:String!, $userName:String!) {
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

export const LEAVE_GAME = gql`
    mutation($gameId:String!, $userId:ID!) {
        leaveGame(gameId:$gameId, userId:$userId) {
            success
        }
    }
`

export const START_TIMER = gql`
    mutation($gameId:String!, $userId:ID!) {
        startTimer(gameId:$gameId, userId:$userId) {
            seconds
            remaining
        }
    }
`

export const PAUSE_TIMER = gql`
    mutation($gameId:String!, $userId:ID!) {
        pauseTimer(gameId:$gameId, userId:$userId) {
            seconds
            remaining
        }
    }
`

export const RESET_TIMER = gql`
    mutation($gameId:String!, $userId:ID!) {
        resetTimer(gameId:$gameId, userId:$userId) {
            seconds
            remaining
        }
    }
`
