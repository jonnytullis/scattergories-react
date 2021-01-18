import react from 'react'
import { AppBar, Button, Toolbar, Avatar } from '@material-ui/core'
import AvatarPicture from '../assets/images/jonny-avatar.png'

export default class TopAppBar extends react.Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" href={'https://github.com/jonnytullis'} target={'_blank'}>
                        <Avatar
                            alt={'Jonny Tullis'}
                            src={AvatarPicture}
                            style={{ marginRight: '14px'}}
                        />
                        Meet the creator
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}