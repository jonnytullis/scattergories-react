import {createMuiTheme} from '@material-ui/core'

const colors = {
    primary: '#111d5e',
    secondary: '#c70039',
    accent: '#f37121',
    light: '#f2f2f2',
    avatarColors: [
        '#c70039',
        '#11698e',
        '#fdb827',
        '#00af91',
        '#eb5e0b',
        '#91684a',
        '#007944',
        '#6155a6',
        '#790c5a',
        '#7e7474'
    ]
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
    }
})

export {
    colors,
    theme
}