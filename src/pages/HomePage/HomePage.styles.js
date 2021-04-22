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
  logoWrapper: {
    marginBottom: 56
  },
}))
