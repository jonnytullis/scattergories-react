import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

export default makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create([ 'margin', 'width' ], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }
  },
  appBarTitle: {
    paddingLeft: 12
  },
  card: {
    padding: 10,
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
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0
    }
  },
  contentHeader: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  hide: {
    display: 'none',
  },
  mobileTitle: {
    textAlign:  'center',
    marginBottom: 20
  },
  pageLayout: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  promptsWrapper: {
    width: '100%'
  },
  settingsButton: {
    marginRight: 120
  },
  spacer: {
    flexGrow: 1,
    minWidth: 4
  },
  wrapper: {
    display: 'flex'
  }
}))
