import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import CharacterGrid from './CharacterGrid';
import dragonBallImage from '../img/DRAGON-BALL-3-12-2025.png';
import { fetchWithCache } from '../../lib/api';
import { API_ENDPOINTS, CACHE_KEYS } from '../../lib/constants';

function DragonBallCarousel() {
    const location = useLocation();
    const searchTerm = location.state?.searchTerm || '';
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const data = await fetchWithCache(
                    API_ENDPOINTS.characters(1, 62),
                    CACHE_KEYS.characters
                );
                if (!cancelled) {
                    if (!data || !Array.isArray(data.items)) {
                        throw new Error('Formato de datos inválido');
                    }
                    setCharacters(data.items);
                }
            } catch (error) {
                if (!cancelled) setError(error.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchCharacters();
        return () => { cancelled = true; };
    }, []);

    const filteredCharacters = useMemo(() =>
        characters.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [characters, searchTerm]
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
                <Typography variant="body2" sx={{ color: '#aaa' }}>
                    Intenta recargar la página.
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#1E2126', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <img src={dragonBallImage} style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }} alt="Dragon Ball" />
            </Box>
            {filteredCharacters.length === 0 ? (
                <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', py: 8 }}>
                    No se encontraron personajes con ese nombre.
                </Typography>
            ) : (
                <CharacterGrid characters={filteredCharacters} />
            )}
        </Container>
    );
}

export default DragonBallCarousel;
