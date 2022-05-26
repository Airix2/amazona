import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        type: 'light',
        primary: {
            main: '#f0c000',
        },
        secondary: {
            main: '#208080',
        }
    },
    typography: {
        h1: {
            fontSize: '1.6rem',
            fontWeight: 400,
            margin: '1rem 0',
        },
        h2: {
            fontSize: '1.4rem',
            fontWeight: 400,
            margin: '1rem 0',
        },
        body1: {
            fontWeight: 'normal'
        }
    },
});

export default lightTheme;