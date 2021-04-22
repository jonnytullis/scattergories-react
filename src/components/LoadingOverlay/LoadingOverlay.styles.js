import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.tooltip + 1,
    color: '#fff',
    position: 'absolute'
  },
}))
