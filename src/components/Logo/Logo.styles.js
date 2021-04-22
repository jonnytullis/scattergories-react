import { makeStyles } from '@material-ui/core/styles'

const colors = {
  textBackground: '#c70039',
  text: '#ffe2e9',
  shadow: '#7f0021'
}

export default makeStyles((theme) => ({
  text: {
    fontSize: 'calc(2rem + 4vw)',
    color: colors.text,
    fontFamily: 'Abril Fatface',
    fontWeight: 'bold',
    margin: '-8px 0 8px 0',
    [theme.breakpoints.down('xs')] : {
      textShadow: dropShadowCss(25, colors.shadow),
    },
    [theme.breakpoints.up('sm')] : {
      textShadow: dropShadowCss(30, colors.shadow),
    },
    [theme.breakpoints.up('lg')] : {
      textShadow: dropShadowCss(40, colors.shadow),
    }
  },
  textBackground: {
    backgroundColor: colors.textBackground,
    borderRadius: '50%',
    padding: 'calc(1rem + 2vw)',
    width: 'fit-content'
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
  }
}))


function dropShadowCss(pixels, color) {
  let style = ''
  for (let i = 1; i < pixels; i++) {
    style += `${i}px ${i}px 2px ${color}, `
  }
  style = style.slice(0, -2)
  return style
}
