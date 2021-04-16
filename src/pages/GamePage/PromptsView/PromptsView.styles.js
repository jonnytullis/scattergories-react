import { makeStyles } from '@material-ui/styles'
import { colors } from '../../../theme'

export default makeStyles(() => {
  return {
    actionButton: {
      alignSelf: 'center'
    },
    blank: {
      borderRadius: '8px',
      opacity: '0.7',
      backgroundColor: colors.captionText
    },
    lineWrapper: {
      width: 'fit-content'
    },
    line: {
      position: 'relative',
      display: 'flex',
      margin: '8px 0',
      alignItems: 'baseline',
      fontSize: '1.2rem'
    },
    lineNumber: {
      minWidth: 50,
      textAlign: 'right',
      paddingRight: 16,
      fontWeight: 'bold'
    },
    hiddenText: {
      visibility: 'hidden'
    },
    overlay: {
      position: 'absolute'
    },
    wrapper: {
      position: 'relative',
      padding: '0 8px'
    }
  }
})
