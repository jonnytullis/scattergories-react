import React, { Suspense } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import { colors } from './theme'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

function getRoutes() {
    const routes = [
        // Home Page
        {
            component: React.lazy(() => import('./views/HomePage/HomePage')),
            path: '/',
        },
        // Games View - Shows all games available to join
        {
            component: React.lazy(() => import('./views/GamesPage/GamesPage')),
            path: '/games',
        },
        // Games View - Shows all games available to join
        {
            component: React.lazy(() => import('./views/CreateGamePage/CreateGamePage')),
            path: '/games/create',
        },
        // Games View - Shows all games available to join
        {
            component: React.lazy(() => import('./views/JoinGamePage/JoinGamePage')),
            path: '/games/join',
        },
        // 404 Not Found
        {
            component: React.lazy(() => import('./views/NotFound/NotFound')),
            path: '*',
        },
    ]

    return routes.map(({path, component}) => (
        <Route exact path={path} component={component} key={path} />
    ))
}

export default class App extends React.Component {
    constructor(props) {
        super(props)

        // This is the state for the entire app
        this.state = {
            attackDice: [],
            defenseDice: []
        }
    }

    render() {
        return (
            <ThemeProvider theme={getTheme()}>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {getRoutes()}
                        </Switch>
                    </Suspense>
                </Router>
            </ThemeProvider>
        )
    }
}

function getTheme() {
    return createMuiTheme({
        palette: {
            primary: {
                main: colors.primary,
            },
            secondary: {
                main: colors.secondary,
            },
        },
    })
}
