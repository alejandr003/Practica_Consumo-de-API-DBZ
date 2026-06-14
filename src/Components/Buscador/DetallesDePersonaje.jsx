import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, CircularProgress, Box, Typography, CardContent, Card, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import dragonBallImage from '../img/DRAGON-BALL-3-12-2025.png';
import removeBackground from '../../lib/removeBackground';
import { revokeObjectUrl } from '../../lib/removeBackground';
import { fetchWithCache } from '../../lib/api';
import { API_ENDPOINTS, CACHE_KEYS, PLACEHOLDER_IMAGE } from '../../lib/constants';

const CharacterImage = styled('img')({
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'contain',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
    },
});

export default function DetallesDePersonaje() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(dragonBallImage);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const fetchCharacter = async () => {
            setLoading(true);
            try {
                const data = await fetchWithCache(
                    API_ENDPOINTS.character(id),
                    CACHE_KEYS.character(id)
                );
                if (cancelled) return;
                if (!data || !data.id || !data.name) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se encontró el personaje!'
                    }).then(() => {
                        navigate('/personajes', { replace: true });
                    });
                    return;
                }
                setCharacter(data);
                const url = await removeBackground(data.image);
                if (!cancelled) setImageUrl(url);
            } catch (error) {
                if (!cancelled) setError(error.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchCharacter();
        return () => {
            cancelled = true;
        };
    }, [id, navigate]);

    useEffect(() => {
        return () => {
            revokeObjectUrl(imageUrl);
        };
    }, [imageUrl]);

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: { xs: 10, sm: 20 }, backgroundColor: '#1E2126', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xl" sx={{ py: { xs: 10, sm: 20 }, backgroundColor: '#1E2126', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 10, sm: 20 }, backgroundColor: '#1E2126', minHeight: '100vh' }}>
            {character && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card sx={{ bgcolor: '#2A2E35', color: 'white', borderRadius: 2, overflow: 'hidden', width: '100%', maxWidth: '800px' }}>
                        <Box sx={{ overflow: 'hidden', height: { xs: '250px', sm: '400px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#1a1d23' }}>
                            {!imageLoaded && (
                                <Skeleton variant="rectangular" width="100%" height="100%" sx={{ bgcolor: '#3a3e45' }} />
                            )}
                            <CharacterImage
                                src={imageUrl}
                                alt={character.name}
                                loading="lazy"
                                onLoad={() => setImageLoaded(true)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = PLACEHOLDER_IMAGE;
                                }}
                                sx={{ display: imageLoaded ? 'block' : 'none' }}
                            />
                        </Box>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: '#2A2E35' }}>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                                {character.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#FFC107', mb: 2 }}>
                                {character.race} - {character.gender}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <Box component="span" sx={{ fontWeight: 'bold' }}>KI modo base:</Box>{' '}
                                <Box component="span" sx={{ color: '#FFC107' }}>{character.ki || "0"}</Box>
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <Box component="span" sx={{ fontWeight: 'bold' }}>KI total:</Box>{' '}
                                <Box component="span" sx={{ color: '#FFC107' }}>{character.maxKi || "0"}</Box>
                            </Typography>
                            <Typography variant="body2">
                                <Box component="span" sx={{ fontWeight: 'bold' }}>Afiliación:</Box>{' '}
                                <Box component="span" sx={{ color: '#FFC107' }}>{character.affiliation}</Box>
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                                <Box component="span" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>Descripcion:</Box>{' '}
                                <Box component="span" sx={{ color: '#FFC107', whiteSpace: 'pre-line' }}>{character.description}</Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Container>
    );
}
