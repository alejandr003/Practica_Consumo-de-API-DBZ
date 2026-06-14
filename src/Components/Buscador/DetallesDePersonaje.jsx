import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, CircularProgress, Box, Typography, CardContent, Card, Skeleton, Chip, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import dragonBallImage from '../img/DRAGON-BALL-3-12-2025.png';
import removeBackground, { getCachedImageUrl } from '../../lib/removeBackground';
import { revokeObjectUrl } from '../../lib/removeBackground';
import { fetchWithCache } from '../../lib/api';
import { API_ENDPOINTS, CACHE_KEYS, PLACEHOLDER_IMAGE } from '../../lib/constants';

const CharacterImage = styled('img')({
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'contain',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'scale(1.05) translateY(-4px)',
    },
});

const CardImageContainer = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    height: 'auto',
    minHeight: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
    position: 'relative',
    padding: '2rem 1rem',
    '@media (max-width: 600px)': {
        minHeight: '250px',
        padding: '1.5rem 1rem',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at top-right, rgba(254, 158, 13, 0.1), transparent)',
        pointerEvents: 'none',
    },
}));

const SkeletonLoader = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
}));

export default function DetallesDePersonaje() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(dragonBallImage);
    const [imageLoading, setImageLoading] = useState(true);
    const [processingImage, setProcessingImage] = useState(false);

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
                
                // Procesar imagen con caché
                const cachedUrl = getCachedImageUrl(data.image);
                if (cachedUrl) {
                    setImageUrl(cachedUrl);
                    setImageLoading(false);
                } else {
                    setProcessingImage(true);
                    const url = await removeBackground(data.image);
                    if (!cancelled) {
                        setImageUrl(url);
                        setProcessingImage(false);
                    }
                }
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
            <Container maxWidth="xl" sx={{ py: { xs: 10, sm: 20 }, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <CircularProgress sx={{ color: 'primary.main' }} />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xl" sx={{ py: { xs: 10, sm: 20 }, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 16, md: 20 }, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {character && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card 
                        sx={{ 
                            bgcolor: 'background.paper', 
                            color: 'text.primary', 
                            borderRadius: 2, 
                            overflow: 'hidden', 
                            width: '100%', 
                            maxWidth: '900px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                            border: '1px solid #f0f0f0'
                        }}
                    >
                        <CardImageContainer>
                            {(imageLoading || processingImage) && (
                                <SkeletonLoader>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <Skeleton 
                                            variant="circular" 
                                            width={50} 
                                            height={50}
                                            sx={{ bgcolor: 'rgba(254, 158, 13, 0.15)' }}
                                        />
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            {processingImage ? 'Procesando imagen...' : 'Cargando...'}
                                        </Typography>
                                    </Box>
                                </SkeletonLoader>
                            )}
                            <Fade in={!imageLoading && !processingImage} timeout={300}>
                                <CharacterImage
                                    src={imageUrl}
                                    alt={character.name}
                                    loading="lazy"
                                    onLoad={() => setImageLoading(false)}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = PLACEHOLDER_IMAGE;
                                        setImageLoading(false);
                                    }}
                                    sx={{ position: 'relative', zIndex: 1 }}
                                />
                            </Fade>
                        </CardImageContainer>
                        <CardContent sx={{ p: { xs: '1.5rem', sm: '2.5rem' }, pt: '2rem' }}>
                            <Typography 
                                variant="h3" 
                                component="div" 
                                sx={{ 
                                    fontWeight: 700, 
                                    mb: 1.5, 
                                    fontSize: { xs: '1.75rem', sm: '2.5rem' },
                                    color: 'text.primary'
                                }}
                            >
                                {character.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
                                <Chip 
                                    label={character.race} 
                                    sx={{ 
                                        backgroundColor: 'rgba(254, 158, 13, 0.12)',
                                        color: 'primary.dark',
                                        fontWeight: 600,
                                        height: '32px',
                                        fontSize: '0.95rem'
                                    }}
                                />
                                <Chip 
                                    label={character.gender} 
                                    sx={{ 
                                        backgroundColor: 'rgba(42, 46, 53, 0.08)',
                                        color: 'text.secondary',
                                        fontWeight: 600,
                                        height: '32px',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
                                <Box>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            fontWeight: 700,
                                            color: 'text.secondary',
                                            display: 'block',
                                            mb: 0.5,
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        KI MODO BASE
                                    </Typography>
                                    <Typography 
                                        variant="h6"
                                        sx={{ 
                                            color: 'primary.main',
                                            fontWeight: 700,
                                            fontSize: '1.5rem'
                                        }}
                                    >
                                        {character.ki || "N/A"}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            fontWeight: 700,
                                            color: 'text.secondary',
                                            display: 'block',
                                            mb: 0.5,
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        KI MÁXIMO
                                    </Typography>
                                    <Typography 
                                        variant="h6"
                                        sx={{ 
                                            color: 'primary.main',
                                            fontWeight: 700,
                                            fontSize: '1.5rem'
                                        }}
                                    >
                                        {character.maxKi || "N/A"}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box 
                                sx={{
                                    p: 2,
                                    bgcolor: 'rgba(254, 158, 13, 0.05)',
                                    borderLeft: '4px solid',
                                    borderColor: 'primary.main',
                                    borderRadius: '4px',
                                    mb: 2.5
                                }}
                            >
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        fontWeight: 700,
                                        color: 'text.secondary',
                                        display: 'block',
                                        mb: 0.75,
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    AFILIACIÓN
                                </Typography>
                                <Typography 
                                    variant="body1"
                                    sx={{ 
                                        color: 'text.primary',
                                        fontWeight: 500,
                                    }}
                                >
                                    {character.affiliation || "Unknown"}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: '#f8f9fa',
                                    borderRadius: '8px',
                                    border: '1px solid #e0e0e0'
                                }}
                            >
                                <Typography 
                                    variant="h6"
                                    sx={{ 
                                        fontWeight: 700,
                                        mb: 1.25,
                                        color: 'text.primary'
                                    }}
                                >
                                    Descripción
                                </Typography>
                                <Typography 
                                    variant="body2"
                                    sx={{ 
                                        color: 'text.secondary',
                                        lineHeight: 1.8,
                                        whiteSpace: 'pre-line'
                                    }}
                                >
                                    {character.description}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Container>
    );
}
