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
    padTop: {
      paddingTop: '12px'
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
    soundBtnHost: {
      position: 'absolute',
      right: 0,
      top: 0
    },
    soundBtnGeneral: {
    }
  }
})
