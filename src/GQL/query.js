import { gql } from '@apollo/client'

export const USER = gql`
    query {
        user {
            id
            name
        }
    }
`
