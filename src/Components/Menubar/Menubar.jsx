import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import dragonBallImage from "../img/DRAGON-BALL-3-12-2025.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 50,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Menubar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate('/personajes', { state: { searchTerm } });
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontSize: '1.5rem' }}
                    >
                        <Box sx={{ display: 'flex', mb: 4, margin: 2 }} component={Link} to="/">
                            <img src={dragonBallImage} style={{ maxWidth: '8%', height: 'auto', maxHeight: '200px' }} alt="Dragon Ball" />
                        </Box>
                    </Typography>
                    <Button color="inherit" sx={{ paddingRight: 5, fontWeight: 'bold', fontSize: '1.1rem' }} component={Link} to="/">Home</Button>
                    <Button color="inherit" sx={{ paddingRight: 5, fontWeight: 'bold', fontSize: '1.1rem' }} component={Link} to="/personajes">Personajes</Button>
                    <Button color="inherit" sx={{ paddingRight: 5, fontWeight: 'bold', fontSize: '1.1rem' }} component={Link} to="/about">About</Button>
                    
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            sx={{ ml: 1, flex: 1 }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}