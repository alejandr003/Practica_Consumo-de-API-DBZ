import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: '#fe9e0d',
            light: '#ffb84d',
            dark: '#e68a00',
            contrastText: '#fff',
        },
        secondary: {
            main: '#2A2E35',
            light: '#3f434b',
            dark: '#1a1d23',
            contrastText: '#fff',
        },
        error: {
            main: '#f44336',
        },
        success: {
            main: '#4caf50',
        },
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#2A2E35',
            secondary: '#666666',
            disabled: '#bdbdbd',
        },
        divider: '#e0e0e0',
    },
    typography: {
        fontFamily: '"Reem Kufi", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 500 },
        body1: { lineHeight: 1.6 },
        body2: { lineHeight: 1.6 },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@import': 'url(https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&display=swap)',
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: 'none',
                    '&:hover': {
                        boxShadow: '0 12px 24px rgba(254, 158, 13, 0.15)',
                        transform: 'translateY(-4px)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                },
                contained: {
                    boxShadow: '0 4px 12px rgba(254, 158, 13, 0.3)',
                    '&:hover': {
                        boxShadow: '0 6px 16px rgba(254, 158, 13, 0.4)',
                    },
                },
            },
        },
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme;
