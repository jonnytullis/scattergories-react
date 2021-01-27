import React, { Suspense } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './theme'
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
        // Home Page
        {
            component: React.lazy(() => import('./views/GamePage/GamePage')),
            path: '/game/:gameId',
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
