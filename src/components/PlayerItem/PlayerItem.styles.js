import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
    avatar: {
        marginRight: 12,
        width: 45,
        height: 45
    },
    container: {
        display: 'flex',
        height: 40
    },
    text: {
        paddingTop: 9,
        maxWidth: 150,
        marginBottom: -7,
    },
    textCaption: {
        color: '#777777'
    }
}))