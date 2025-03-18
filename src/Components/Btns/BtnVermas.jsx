import React from "react";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from "react-router-dom";

export default function BtnVermas(props) {
    const { character } = props;

    console.log('ID NAV:', character)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop:15, paddingBottom:15 }}>
            <Button 
                variant="contained" 
                style={{ backgroundColor: '#fe9e0d' }}
                component={Link}
                to={`/personajes/${character.id}`}
            >
                <Typography variant="button" color="textPrimary">Conocer más</Typography>
            </Button>
        </div>
    );

}