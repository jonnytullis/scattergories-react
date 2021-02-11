import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../theme'

export default makeStyles(() => ({
    avatar: {
        marginRight: 12,
        width: 45,
        height: 45
    },
    container: {
        display: 'flex',
        height: 40
    },
    text: {
        maxWidth: 150,
        marginBottom: -5,
    },
    textCaption: {
        color: colors.disabled
    },
    textWrapper: {
        marginTop: 'auto',
        marginBottom: 'auto'
    }
}))