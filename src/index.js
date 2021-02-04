import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import {WebSocketLink} from '@apollo/client/link/ws'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import GameProvider from './context/GameContext'
import AlertProvider from './context/AlertContext'

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={getApolloClient()}>
          <AlertProvider>
              <GameProvider>
                  <App />
              </GameProvider>
          </AlertProvider>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

function getApolloClient() {
    // Open up the web socket to use GraphQL subscriptions
    const link = new WebSocketLink({
        uri: `ws://localhost:4000/graphql`,
        options: {
            reconnect: true
        }
    })

    return new ApolloClient({
        link,
        uri: 'http://localhost:4000/graphql', // URI for graphql server
        cache: new InMemoryCache()
    })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
