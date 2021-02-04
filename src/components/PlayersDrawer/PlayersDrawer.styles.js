import { makeStyles } from '@material-ui/styles'

const drawerWidth = 240

export default makeStyles((theme) => {
    return {
        title: {
            marginRight: 'auto',
            marginLeft: 16
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            position: 'sticky',
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: 'white',
            borderBottom: `1px ${theme.palette.divider} solid`,
            top: '0px',
            left: '0px',
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        listItem: {
            marginBottom: 4
        }
    }
})