import react from 'react'
import './styles/App.css'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Colors from './styles/colors.js'
import DiceGroup from './components/DiceGroup'
import TopAppBar from './components/TopAppBar'

import { Container, Card } from '@material-ui/core'

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

export default class App extends react.Component {
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
                <div className='App'>
                    <TopAppBar />
                    <Container>
                        <Card className='Center'>
                            <DiceGroup color={ Colors.attacker } numDice={3} />
                        </Card>
                    </Container>
                </div>
            </ThemeProvider>
        )
    }
}
