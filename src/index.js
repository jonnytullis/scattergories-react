import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, split, concat, ApolloLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import AlertProvider from './context/AlertContext'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={getApolloClient()}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

function getApolloClient() {
  // Queries and mutations will use HTTP as normal, and subscriptions will use WebSocket.
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
  })

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
    }
  })

  // This handles the decision of whether to use WebSocket or HTTP link
  // https://www.apollographql.com/docs/react/data/subscriptions/#3-split-communication-by-operation-recommended
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink,
  )

  // This middleware adds an authorization header to every query and mutation request
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('sessionId')}`,
      }
    })

    return forward(operation)
  })

  // This adds a session ID to the payload of every subscription
  const subscriptionAuthMiddleware = {
    applyMiddleware(options, next) {
      options.authorization = `Bearer ${window.localStorage.getItem('sessionId')}`
      next()
    }
  }
  wsLink.subscriptionClient.use([ subscriptionAuthMiddleware ])

  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  return new ApolloClient({
    link: concat(authMiddleware, splitLink),
    uri: 'http://localhost:4000/graphql', // URI for graphql server
    cache: new InMemoryCache(),
    defaultOptions
  })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
