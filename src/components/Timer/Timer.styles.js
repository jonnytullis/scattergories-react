import { makeStyles } from '@material-ui/styles'
import { colors } from '../../theme'

export default makeStyles((theme) => {
    return {
        grid: {
            minWidth: 230
        },
        center: {
            textAlign: 'center',
            position: 'relative'
        },
        clockFont: {
            fontFamily: 'Arial, Sans-serif'
        },
        hide: {
            display: 'none !important'
        },
        pausedTextContainer: {
            margin: '-8px 0',
            height: 24,

        },
        pausedText: {
            color: colors.disabled,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
})