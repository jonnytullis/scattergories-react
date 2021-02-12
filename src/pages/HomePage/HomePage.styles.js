import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  buttonLarge:  {
    height: 90,
    width: 280,
    borderRadius: '45px !important',
    fontSize: '1.5em !important',
    fontWeight: 'bold !important',
    color: 'white !important'
  },
  buttonRow: {
    padding: '56px 0'
  },
  center: {
    textAlign: 'center'
  },
  container: {
    padding: `56px 12px`
  },
  dialog: {
    paddingBottom: 24
  },
  logoImage: {
    height: '100%'
  },
  logoImageWrapper: {
    boxShadow: '5px 8px 18px #888888',
    borderRadius: 50,
    [theme.breakpoints.down('xs')] : {
      height: 150,
      width: 150
    },
    [theme.breakpoints.up('sm')] : {
      height: 250,
      width: 250
    },
    [theme.breakpoints.up('md')] : {
      width: 300,
      height: 300
    },
    margin: '36px auto'
  },
  logoText: {
    [theme.breakpoints.down('xs')] : {
      height: 70
    },
    [theme.breakpoints.up('sm')] : {
      height: 115
    },
    margin: '-40px 0'
  }
}))