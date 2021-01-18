import react from 'react'
import '../../styles/App.css'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Container, Card } from '@material-ui/core'

import TopAppBar from '../../components/TopAppBar'
import DieRoller from '../../components/DieRoller'

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
                    <Container style={{ paddingTop: '36px', paddingBottom: '36px' }}>
                        <Card className='Center' raised={true} style={{ padding: '18px' }}>
                            <DieRoller />
                        </Card>
                    </Container>
                </div>
            </ThemeProvider>
        )
    }
}
