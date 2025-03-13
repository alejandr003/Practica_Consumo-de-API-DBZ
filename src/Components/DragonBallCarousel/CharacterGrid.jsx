import React from 'react';
import { Grid, Box } from '@mui/material';
import CharacterCard from './CharacterCard';

const CharacterGrid = ({ characters }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center">
                {characters.map((character) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                        <CharacterCard character={character} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CharacterGrid;