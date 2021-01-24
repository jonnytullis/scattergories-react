import { ApolloClient, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'

// Open up the web socket to use GraphQL subscriptions
const link = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true
    }
})

const client = new ApolloClient({
    link,
    uri: 'http://localhost:4000/graphql', // URI for graphql server
    cache: new InMemoryCache()
})

export default {
    client
}