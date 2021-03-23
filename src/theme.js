import { createMuiTheme } from '@material-ui/core'

const colors = {
  primary: '#111d5e',
  secondary: '#c70039',
  error: '#db0000',
  accent: '#f37121',
  light: '#f2f2f2',
  captionText: '#999999',
  disabledButton: '#aaaaaa'
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '1em'
      }
    }
  }
})

export {
  colors,
  theme
}
