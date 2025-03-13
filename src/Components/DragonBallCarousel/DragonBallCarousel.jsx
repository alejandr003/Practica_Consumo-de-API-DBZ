import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import CharacterGrid from './CharacterGrid';
import dragonBallImage from '../img/DRAGON-BALL-3-12-2025.png';

function DragonBallCarousel() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch('https://dragonball-api.com/api/characters');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();

                // Aquí está el cambio principal: acceder a data.items en lugar de data directamente
                setCharacters(data.items || []);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#1E2126' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <img src={dragonBallImage} style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }} alt="Dragon Ball" />
            </Box>
            <CharacterGrid characters={characters} />
        </Container>
    );
}

export default DragonBallCarousel;