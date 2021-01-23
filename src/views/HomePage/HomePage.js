import React from 'react'
import './HomePage.css'
import {Grid, Container, Box, Button} from '@material-ui/core'
import {colors} from '../../theme'
import Logo from '../../assets/images/scattergories-logo.png'
import { useHistory } from 'react-router-dom'

export default function HomePage() {
    const history = useHistory()
    return (
        <Container style={{ padding: `${window.innerHeight / 16}px 12px`, maxHeight: `${window.innerHeight}px` }}>
            <Box display="flex">
                <Box m="auto" style={{ boxShadow: '5px 8px 18px #888888', borderRadius: 50 }}>
                    <img src={Logo} style={{ marginBottom: -5, height: 300 }}  alt="Logo" />
                </Box>
            </Box>
            <Box display="flex" style={{ margin: '0px 0 24px 0' }}>
                <Box m="auto">
                    <h2>Let's play Scattergories!</h2>
                </Box>
            </Box>
            <Grid container alignItems="center" spacing={3} style={{ textAlign: 'center' }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                        variant="contained"
                        className="Button-Large"
                        style={{ backgroundColor: colors.primary }}
                        onClick={() => history.push('/games/create')}
                    >
                        Create Game
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                        variant="contained"
                        className="Button-Large"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={() => history.push('/games/join')}
                    >
                        Join Game
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}