import react from 'react'
import { Button, Container } from '@material-ui/core'
import Die from '../components/Die'

export default class DieRoller extends react.Component {
    render() {
        return (
            <Container style={{ textAlign: 'center' }}>
                <Die value={3} />
                <Button color="inherit" variant={'contained'}>
                    Roll
                </Button>
            </Container>
        )
    }
}