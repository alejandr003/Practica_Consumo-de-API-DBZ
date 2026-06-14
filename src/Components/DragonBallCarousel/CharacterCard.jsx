import React, { useEffect, useState, memo, useCallback } from 'react';
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import removeBackground from '../../lib/removeBackground';
import { revokeObjectUrl } from '../../lib/removeBackground';
import { PLACEHOLDER_IMAGE } from '../../lib/constants';
import BtnVermas from '../Btns/BtnVermas';

const CharacterImage = styled('img')({
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
    },
});

const CharacterCard = memo(({ character }) => {
    const [imageUrl, setImageUrl] = useState(character.image);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const fetchImage = async () => {
            const url = await removeBackground(character.image);
            if (!cancelled) setImageUrl(url);
        };
        fetchImage();
        return () => {
            cancelled = true;
        };
    }, [character.image]);

    useEffect(() => {
        return () => {
            revokeObjectUrl(imageUrl);
        };
    }, [imageUrl]);

    const handleImageError = useCallback((e) => {
        e.target.onerror = null;
        e.target.src = PLACEHOLDER_IMAGE;
    }, []);

    return (
        <Card
            sx={{
                bgcolor: '#2A2E35',
                color: 'white',
                borderRadius: 2,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{ overflow: 'hidden', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#1a1d23' }}>
                {!imageLoaded && (
                    <Skeleton variant="rectangular" width="100%" height="100%" sx={{ bgcolor: '#3a3e45' }} />
                )}
                <CharacterImage
                    src={imageUrl}
                    alt={character.name}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={handleImageError}
                    sx={{ display: imageLoaded ? 'block' : 'none' }}
                />
            </Box>
            <CardContent sx={{ p: 2, bgcolor: '#2A2E35' }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
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
                    <Box component="span" sx={{ color: '#FFC107' }}>{character.affiliation || "Unknown"}</Box>
                </Typography>
                <BtnVermas character={character} />
            </CardContent>
        </Card>
    );
});

export default CharacterCard;
