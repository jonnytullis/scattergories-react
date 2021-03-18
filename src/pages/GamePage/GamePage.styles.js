import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../theme'

const drawerWidth = 240

export default makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  card: {
    padding: 12,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  contentHeader: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  hide: {
    display: 'none',
  },
  leaveButton: {
    backgroundColor: colors.error,
    color: colors.light,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: colors.secondary
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  pageLayout: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  promptsWrapper: {
    width: '100%'
  },
  spacer: {
    flexGrow: 1
  },
  wrapper: {
    display: 'flex',
  }
}))
