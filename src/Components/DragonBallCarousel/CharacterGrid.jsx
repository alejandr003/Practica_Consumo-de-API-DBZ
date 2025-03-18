import React from 'react';
import { Grid } from '@mui/material';
import CharacterCard from './CharacterCard';

function CharacterGrid({ characters }) {
    return (
        <Grid container spacing={2}>
            {characters.map((character) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                    <CharacterCard character={character} />
                </Grid>
            ))}
        </Grid>
    );
}

export default CharacterGrid;