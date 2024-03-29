import { makeStyles } from '@material-ui/styles'

const drawerWidth = 240

export default makeStyles((theme) => {
  return {
    title: {
      marginRight: 'auto',
      marginLeft: 16
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: '0 1px 6px #c1c1c1'
    },
    drawerHeader: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderBottom: `1px ${theme.palette.divider} solid`,
      display: 'flex',
      marginBottom: -8,
      minHeight: 65,
      padding: theme.spacing(0, 1),
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: theme.zIndex.drawer + 1,
    },
    footerBar: {
      top: 'auto',
      bottom: 0
    },
    list: {
      height: '100%',
      overflowY: 'auto'
    },
    listItem: {
      marginBottom: 4,
      paddingLeft: 8
    }
  }
})
