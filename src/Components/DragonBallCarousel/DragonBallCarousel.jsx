import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, CircularProgress, Box, Typography, Button } from '@mui/material';
import CharacterGrid from './CharacterGrid';
import dragonBallImage from '../img/DRAGON-BALL-3-12-2025.png';
import { fetchWithCache } from '../../lib/api';
import { API_ENDPOINTS, CACHE_KEYS } from '../../lib/constants';

const CHARACTERS_PER_PAGE = 8; // 2 filas de 4 personajes

function DragonBallCarousel() {
    const location = useLocation();
    const searchTerm = location.state?.searchTerm || '';
    const [allCharacters, setAllCharacters] = useState([]);
    const [displayedCount, setDisplayedCount] = useState(CHARACTERS_PER_PAGE);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
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
                    setAllCharacters(data.items);
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

    // Filtrar personajes según búsqueda
    const filteredCharacters = useMemo(() =>
        allCharacters.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [allCharacters, searchTerm]
    );

    // Mostrar solo los personajes hasta displayedCount
    const displayedCharacters = useMemo(() =>
        filteredCharacters.slice(0, displayedCount),
        [filteredCharacters, displayedCount]
    );

    const handleLoadMore = () => {
        setLoadingMore(true);
        // Simular pequeño delay para feedback visual
        setTimeout(() => {
            setDisplayedCount(prev => prev + CHARACTERS_PER_PAGE);
            setLoadingMore(false);
        }, 300);
    };

    const hasMoreCharacters = displayedCount < filteredCharacters.length;

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress sx={{ color: 'primary.main' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Intenta recargar la página.
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 6, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                <img 
                    src={dragonBallImage} 
                    style={{ 
                        maxWidth: '100%', 
                        height: 'auto', 
                        maxHeight: '180px',
                        filter: 'drop-shadow(0 4px 12px rgba(254, 158, 13, 0.15))'
                    }} 
                    alt="Dragon Ball" 
                />
            </Box>
            
            {filteredCharacters.length === 0 ? (
                <Typography 
                    variant="h5" 
                    sx={{ 
                        color: 'text.secondary', 
                        textAlign: 'center', 
                        py: 8,
                        fontWeight: 500
                    }}
                >
                    No se encontraron personajes con ese nombre.
                </Typography>
            ) : (
                <>
                    <CharacterGrid characters={displayedCharacters} />
                    
                    {hasMoreCharacters && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 6,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                sx={{
                                    fontWeight: 600,
                                    padding: '0.875rem 3rem',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 12px rgba(254, 158, 13, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 6px 16px rgba(254, 158, 13, 0.4)',
                                        transform: 'translateY(-2px)',
                                    },
                                    '&:disabled': {
                                        opacity: 0.7,
                                    }
                                }}
                            >
                                {loadingMore ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} color="inherit" />
                                        Cargando...
                                    </Box>
                                ) : (
                                    `Ver más`
                                )}
                            </Button>
                        </Box>
                    )}

                    {displayedCharacters.length > 0 && (
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: 'center',
                                mt: 4,
                                color: 'text.secondary',
                                fontSize: '0.9rem'
                            }}
                        >
                            Mostrando {displayedCharacters.length} de {filteredCharacters.length} personajes
                        </Typography>
                    )}
                </>
            )}
        </Container>
    );
}

export default DragonBallCarousel;
