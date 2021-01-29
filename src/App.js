import React, { Suspense } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './theme'
import Store from './context/Store'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

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
            path: '/game/:gameId',
        },
        // 404 Not Found
        {
            component: React.lazy(() => import('./pages/NotFound/NotFound')),
            path: '*',
        },
    ]

    return routes.map(({path, component}) => (
        <Route exact path={path} component={component} key={path} />
    ))
}

export default class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Store>
                    <Router>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                {getRoutes()}
                            </Switch>
                        </Suspense>
                    </Router>
                </Store>
            </ThemeProvider>
        )
    }
}
