import { gql } from '@apollo/client'

export const JOIN_GAME = gql`
    mutation($gameId:String!, $userName:String!) {
        joinGame(gameId:$gameId, userName:$userName) {
            gameId
            userId
        }
    }
`

export const CREATE_GAME = gql`
    mutation($hostName:String!, $gameName:String!) {
        createGame(hostName:$hostName, gameName:$gameName) {
            gameId
            userId
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

export const NEW_LETTER = gql`
    mutation($gameId:String!, $userId:ID!) {
        newLetter(gameId:$gameId, userId:$userId) {
            letter
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

export const UPDATE_SETTINGS = gql`
    mutation($gameId:String!, $userId:ID!, $settings:SettingsInput!) {
        updateSettings(gameId:$gameId, userId:$userId, settings:$settings) {
            timerSeconds
            numPrompts
            numRounds
        }
    }
`
