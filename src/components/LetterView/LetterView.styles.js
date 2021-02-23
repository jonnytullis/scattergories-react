import { makeStyles } from '@material-ui/styles'

export default makeStyles(() => {
  return {
    buttonContainer: {
      textAlign: 'center'
    },
    container: {
      height: 160,
      width: '100%',
      textAlign: 'center'
    },
    hide: {
      display: 'none'
    },
    letter: {
      fontFamily: 'Georgia, Times New Roman, Serif',
      fontSize: '150px',
      margin: '-24px 0'
    }
  }
})