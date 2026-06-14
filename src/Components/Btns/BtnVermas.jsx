import React from "react";
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";

export default function BtnVermas(props) {
    const { character } = props;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button 
                variant="contained" 
                color="primary"
                component={Link}
                to={`/personajes/${character.id}`}
                sx={{
                    width: '100%',
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(254, 158, 13, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 6px 16px rgba(254, 158, 13, 0.4)',
                        transform: 'translateY(-2px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    }
                }}
            >
                Conocer más
            </Button>
        </div>
    );

}