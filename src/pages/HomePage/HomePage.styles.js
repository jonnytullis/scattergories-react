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
  center: {
    textAlign: 'center'
  },
  container: {
    padding: `56px 12px`,
    [theme.breakpoints.down('sm')]: {
      padding: '36px 12px'
    }
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
      width: 150,
      borderRadius: 24,
    },
    [theme.breakpoints.up('sm')] : {
      height: 200,
      width: 200,
      borderRadius: 40,
    },
    [theme.breakpoints.up('md')] : {
      width: 250,
      height: 250,
      borderRadius: 46,
    },
    margin: '36px auto'
  },
}))
