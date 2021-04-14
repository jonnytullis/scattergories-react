import { gql } from '@apollo/client'

export const JOIN_GAME = gql`
    mutation($gameId:ID!, $userName:String!) {
        joinGame(gameId:$gameId, userName:$userName) {
            gameId
            userId
            sessionId
        }
    }
`

export const CREATE_GAME = gql`
    mutation($hostName:String!, $gameName:String!) {
        createGame(hostName:$hostName, gameName:$gameName) {
            gameId
            userId
            sessionId
        }
    }
`

export const LEAVE_GAME = gql`
    mutation {
        leaveGame {
            success
        }
    }
`

export const NEW_LETTER = gql`
    mutation {
        newLetter {
            letter
        }
    }
`

export const NEW_PROMPTS = gql`
    mutation {
        newPrompts {
            prompts
        }
    }
`

export const START_TIMER = gql`
    mutation {
        startTimer {
            success
        }
    }
`

export const PAUSE_TIMER = gql`
    mutation {
        pauseTimer {
            success
        }
    }
`

export const RESET_TIMER = gql`
    mutation {
        resetTimer {
            success
        }
    }
`

export const UPDATE_SETTINGS = gql`
    mutation($settings:SettingsInput!) {
        updateSettings(settings:$settings) {
            settings {
                timerSeconds
                numPrompts
            }
        }
    }
`
