import { makeStyles } from '@material-ui/styles'

export default makeStyles(() => {
  return {
    blank: {
      backgroundColor: 'grey'
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
    }
  }
})
