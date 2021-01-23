import React, { Suspense } from 'react'
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
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {getRoutes()}
                    </Switch>
                </Suspense>
            </Router>
        )
    }
}
