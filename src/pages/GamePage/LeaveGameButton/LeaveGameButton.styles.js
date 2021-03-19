import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../../theme'

export default makeStyles(() => ({
  leaveButton: {
    backgroundColor: colors.error,
    color: colors.light,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: colors.secondary
    }
  },
  dialog: {
    textAlign: 'center'
  },
  dialogContent: {
    minWidth: 250,
    margin: '-12px 0 8px 0'
  }
}))
