import React, { Suspense } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Container, Card } from '@material-ui/core'

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
            <ThemeProvider theme={theme}>
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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#363636'
        },
        secondary: {
            main: '#828282',
        },
    },
})
