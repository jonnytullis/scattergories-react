import React from 'react'
import Die from './Die.js'
import { Button, Grid } from '@material-ui/core'

export default class DiceGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            diceValues: Array(this.props.numDice).fill(6),
            numSides: 6
        }
    }

    rollDice() {
        const diceValues = []
        for (let i = 0; i < this.props.numDice; i++) {
            diceValues.push(Math.floor(Math.random() * this.state.numSides) + 1)
        }
        diceValues.sort((a, b) => a < b ? -1 : 1)
        this.setState({ diceValues })
    }

    render() {
        return (
            <div>
                <Grid container justify='center'>
                    {this.state.diceValues.map((val, index) =>
                        <Die
                            color={this.props.color}
                            value={val}
                            key={index} />
                    )}
                </Grid>
                <Button
                    color={'primary'}
                    variant={'contained'}
                    style={{ height: '40px', margin: '20px' }}
                    onClick={() => { this.rollDice() }}
                >
                    Roll
                </Button>
            </div>
        )
    }
}