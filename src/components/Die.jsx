import React from 'react'
import '../styles/styles.css'
import {Avatar, Container} from '@material-ui/core'

export default class Die extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container >
                <Avatar variant={'square'} />
            </Container>
        )
    }
}

