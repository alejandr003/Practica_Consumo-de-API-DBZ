import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import CharacterGrid from './CharacterGrid';
import dragonBallImage from '../img/DRAGON-BALL-3-12-2025.png';
import Swal from 'sweetalert2';

function DragonBallCarousel() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchTerm = location.state?.searchTerm || '';
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCharacters = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://dragonball-api.com/api/characters?page=1&limit=62');
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            const filteredCharacters = data.items.filter(character =>
                character.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredCharacters.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se encontró alguna coincidencia!'
                }).then(() => {
                    navigate('/personajes', { state: { searchTerm: '' } });
                });
            } else {
                setCharacters(filteredCharacters);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, [searchTerm, navigate]);

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