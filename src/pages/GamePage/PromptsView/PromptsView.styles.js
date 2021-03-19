import { makeStyles } from '@material-ui/styles'

export default makeStyles(() => {
  return {
    lineContainer: {
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
    }
  }
})
