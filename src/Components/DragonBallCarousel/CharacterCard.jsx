import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import removeBackground from '../Remove/RemoveBackground';
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

const CharacterCard = ({ character }) => {
    const [imageUrl, setImageUrl] = useState(character.image);

    useEffect(() => {
        const fetchImage = async () => {
            const url = await removeBackground(character.image);
            setImageUrl(url);
        };

        fetchImage();
    }, [character.image]);

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
            <Box sx={{ overflow: 'hidden', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CharacterImage
                    src={imageUrl}
                    alt={character.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x280?text=No+Image';
                    }}
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
                <BtnVermas character = {character} />
            </CardContent>
        </Card>
    );
};

export default CharacterCard;