import React from 'react'
import useStyles from './GamePage.styles'
import clsx from 'clsx'
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Grid,
    Card
} from '@material-ui/core'
import Group from '@material-ui/icons/Group'

import {LetterView, TimerView, PromptsView, ParticipantsDrawer} from '../../components'

export default function PersistentDrawerLeft() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <Group />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <ParticipantsDrawer open={open} onClose={handleDrawerClose} />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.contentHeader} />
                <Grid container spacing={3} direction="row">
                    <Grid item>
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Card className={classes.card}>
                                    <TimerView seconds={180} />
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.card}>
                                    <LetterView letter="A" />
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                        <Card className={classes.card}>
                            <PromptsView
                                prompts={[
                                    'Test',
                                    'test',
                                    'test',
                                    'test',
                                    'Test',
                                    'test',
                                    'test',
                                    'test',
                                    'Test',
                                    'test',
                                    'test',
                                    'test'
                                ]} />
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}