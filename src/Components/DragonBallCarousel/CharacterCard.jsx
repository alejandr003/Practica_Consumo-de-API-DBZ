import React, { useEffect, useState, memo, useCallback } from 'react';
import { Card, CardContent, Typography, Box, Skeleton, Chip, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import removeBackground, { getCachedImageUrl } from '../../lib/removeBackground';
import { revokeObjectUrl } from '../../lib/removeBackground';
import { PLACEHOLDER_IMAGE } from '../../lib/constants';
import BtnVermas from '../Btns/BtnVermas';

const CharacterImage = styled('img')({
    width: '100%',
    height: 'auto',
    maxHeight: '220px',
    objectFit: 'contain',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'scale(1.08) translateY(-4px)',
    },
});

const CardImageContainer = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    height: '240px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
    position: 'relative',
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

const CharacterCard = memo(({ character }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [processingImage, setProcessingImage] = useState(false);

    useEffect(() => {
        let cancelled = false;
        
        const initializeImage = async () => {
            // Verificar si ya está en caché
            const cachedUrl = getCachedImageUrl(character.image);
            if (cachedUrl) {
                if (!cancelled) {
                    setImageUrl(cachedUrl);
                    setImageLoading(false);
                }
                return;
            }

            setProcessingImage(true);
            try {
                const url = await removeBackground(character.image);
                if (!cancelled) {
                    setImageUrl(url);
                    setProcessingImage(false);
                }
            } catch (error) {
                if (!cancelled) {
                    setImageUrl(character.image);
                    setProcessingImage(false);
                }
            }
        };

        initializeImage();
        return () => {
            cancelled = true;
        };
    }, [character.image]);

    const handleImageError = useCallback((e) => {
        e.target.onerror = null;
        e.target.src = PLACEHOLDER_IMAGE;
        setImageLoading(false);
    }, []);

    const handleImageLoad = useCallback(() => {
        setImageLoading(false);
    }, []);

    return (
        <Card
            sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderRadius: 2,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f0f0f0',
            }}
        >
            <CardImageContainer>
                {(imageLoading || processingImage) && (
                    <SkeletonLoader>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Skeleton 
                                variant="circular" 
                                width={40} 
                                height={40}
                                sx={{ bgcolor: 'rgba(254, 158, 13, 0.15)' }}
                            />
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '0.75rem'
                                }}
                            >
                                {processingImage ? 'Procesando...' : 'Cargando...'}
                            </Typography>
                        </Box>
                    </SkeletonLoader>
                )}
                <Fade in={!imageLoading && !processingImage} timeout={300}>
                    <CharacterImage
                        src={imageUrl}
                        alt={character.name}
                        loading="lazy"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        sx={{ position: 'relative', zIndex: 1 }}
                    />
                </Fade>
            </CardImageContainer>
            <CardContent sx={{ p: '1.5rem', pt: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        color: 'text.primary',
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                >
                    {character.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5, flexWrap: 'wrap' }}>
                    <Chip 
                        label={character.race} 
                        size="small"
                        sx={{ 
                            height: '28px',
                            backgroundColor: 'rgba(254, 158, 13, 0.12)',
                            color: 'primary.dark',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                        }}
                    />
                    <Chip 
                        label={character.gender} 
                        size="small"
                        sx={{ 
                            height: '28px',
                            backgroundColor: 'rgba(42, 46, 53, 0.08)',
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                        }}
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 1 }}>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                fontWeight: 700,
                                color: 'text.secondary',
                                display: 'block',
                                mb: 0.25
                            }}
                        >
                            KI Base
                        </Typography>
                        <Typography 
                            variant="body2"
                            sx={{ 
                                color: 'primary.main',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            {character.ki || "N/A"}
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                fontWeight: 700,
                                color: 'text.secondary',
                                display: 'block',
                                mb: 0.25
                            }}
                        >
                            KI Máximo
                        </Typography>
                        <Typography 
                            variant="body2"
                            sx={{ 
                                color: 'primary.main',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            {character.maxKi || "N/A"}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                fontWeight: 700,
                                color: 'text.secondary',
                                display: 'block',
                                mb: 0.25
                            }}
                        >
                            Afiliación
                        </Typography>
                        <Typography 
                            variant="body2"
                            sx={{ 
                                color: 'text.primary',
                                fontWeight: 500,
                            }}
                        >
                            {character.affiliation || "Unknown"}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: 1.5 }}>
                    <BtnVermas character={character} />
                </Box>
            </CardContent>
        </Card>
    );
});

export default CharacterCard;
