import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <Container maxWidth="sm" sx={{ py: 20, textAlign: 'center', minHeight: '100vh', backgroundColor: '#1E2126', color: 'white' }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, color: '#fe9e0d' }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
                Página no encontrada
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#aaa' }}>
                La página que buscas no existe o fue movida.
            </Typography>
            <Button
                variant="contained"
                component={Link}
                to="/"
                sx={{ backgroundColor: '#fe9e0d', '&:hover': { backgroundColor: '#e48f0f' } }}
            >
                Volver al inicio
            </Button>
        </Container>
    );
}
