import React, { Suspense } from 'react'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './theme'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import ErrorBoundary from './ErrorBoundary'

function getRoutes() {
  const routes = [
    // Home Page
    {
      component: React.lazy(() => import('./pages/HomePage/HomePage')),
      path: '/',
    },
    // Home Page
    {
      component: React.lazy(() => import('./pages/GamePage/GamePage')),
      path: '/game/:userId/:gameId',
    },
    // 404 Not Found
    {
      component: React.lazy(() => import('./pages/NotFound/NotFound')),
      path: '*',
    },
  ]

  return routes.map(({ path, component }) => (
    <Route exact path={path} component={component} key={path} />
  ))
}

export default class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <CssBaseline />
              <Switch>
                {getRoutes()}
              </Switch>
            </Suspense>
          </Router>
        </ThemeProvider>
      </ErrorBoundary>
    )
  }
}
