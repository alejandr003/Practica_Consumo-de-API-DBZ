import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <Container 
            maxWidth="sm" 
            sx={{ 
                py: 20, 
                textAlign: 'center', 
                minHeight: '100vh', 
                backgroundColor: '#f8f9fa', 
                color: 'text.primary',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Typography 
                variant="h2" 
                sx={{ 
                    fontWeight: 700, 
                    mb: 2, 
                    color: 'primary.main',
                    fontSize: '5rem'
                }}
            >
                404
            </Typography>
            <Typography 
                variant="h5" 
                sx={{ 
                    mb: 2,
                    color: 'text.primary',
                    fontWeight: 600
                }}
            >
                Página no encontrada
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ 
                    mb: 4, 
                    color: 'text.secondary',
                    fontSize: '1.1rem'
                }}
            >
                La página que buscas no existe o fue movida.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                sx={{ 
                    fontWeight: 600,
                    padding: '0.75rem 2rem',
                    boxShadow: '0 4px 12px rgba(254, 158, 13, 0.3)',
                    '&:hover': { 
                        boxShadow: '0 6px 16px rgba(254, 158, 13, 0.4)',
                        transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                Volver al inicio
            </Button>
        </Container>
    );
}
