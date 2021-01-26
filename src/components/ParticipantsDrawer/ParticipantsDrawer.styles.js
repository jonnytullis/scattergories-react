import { makeStyles } from '@material-ui/core/styles'
import {colors} from '../../theme'

const drawerWidth = 240

export default makeStyles(() => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: colors.light
    },
    drawerContainer: {
        overflow: 'auto',
    }
}))