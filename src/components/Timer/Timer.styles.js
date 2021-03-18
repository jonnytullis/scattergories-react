import { makeStyles } from '@material-ui/styles'
import { colors } from '../../theme'

export default makeStyles(() => {
  return {
    buttonRow: {
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
      height: 24,
    },
    pausedText: {
      color: colors.disabled,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    soundBtn: {
      position: 'absolute',
      right: 0,
      top: 0
    },
    wrapper: {
      paddingTop: '12px'
    }
  }
})
