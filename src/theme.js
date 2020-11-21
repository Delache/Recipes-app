import { createMuiTheme }  from '@material-ui/core/styles'
import './index.css'

const theme =
  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  createMuiTheme({
    overrides: {
      MuiPaper: {
        root: {
          fontSize:24,
        },
      },
    },
    typography: {
      fontFamily: [
        'Yesteryear',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },

    palette: {
      //type: prefersDarkMode ? 'dark' : 'light', //change to get dark mode
      primary: {
        main:'#8381A1'
        //main: '#FFBECF'
      },
      secondary:{
        //main: '#1b384a'
        main:'##F88F9D'
      },
      error:{
        main: '#f44336'
      },
    },

    test:{
      color:'red'
    }
  }
)


export default theme
