import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: '#fe9e0d',
        },
        secondary: {
            main: '#2A2E35',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#f6f6f6',
        },
    },
    typography: {
        fontFamily: '"Reem Kufi", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@import': 'url(https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&display=swap)',
            },
        },
    },
});

export default theme;
