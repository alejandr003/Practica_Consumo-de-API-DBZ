import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Container, CircularProgress, Box, Typography, CardContent, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import dragonBallImage from "../img/DRAGON-BALL-3-12-2025.png";
import removeBackground from '../Remove/RemoveBackground';

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
    const location = useLocation();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(dragonBallImage);

    const fetchSearchedCharacter = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCharacter(data);
                const url = await removeBackground(data.image);
                setImageUrl(url);
                setLoading(false);
                return;
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontró alguna coincidencia!'
            }).then(() => {
                navigate('/personajes', { state: { searchTerm: '' } });
            });
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchedCharacter();
    }, [id]);

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
        <Container maxWidth="xl" sx={{ py: 20, backgroundColor: '#1E2126' }}>
            {character && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card sx={{ bgcolor: '#2A2E35', color: 'white', borderRadius: 2, overflow: 'hidden', width: '100%', maxWidth: '800px' }}>
                        <Box sx={{ overflow: 'hidden', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CharacterImage
                                src={imageUrl}
                                alt={character ? character.name : "Dragon Ball"}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/400x280?text=No+Image';
                                }}
                            />
                        </Box>
                        <CardContent sx={{ p: 2, bgcolor: '#2A2E35' }}>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
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
                                <Box component="span" sx={{ color: '#FFC107' }}>{character.affiliation }</Box>
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                                <Box component="span" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>Descripcion:</Box>{' '}
                                <Box component="span" sx={{ color: '#FFC107', whiteSpace: 'pre-line' }}>{character.description }</Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Container>
    );
}