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
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    border: `2px solid transparent`,
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
    '&:focus-within': {
        backgroundColor: alpha(theme.palette.primary.main, 0.14),
        borderColor: theme.palette.primary.main,
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        fontSize: '0.95rem',
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Personajes', path: '/personajes' },
    { label: 'About', path: '/about' },
];

export default function Menubar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate('/personajes', { state: { searchTerm } });
        }
    };

    const drawer = (
        <Box onClick={() => setMobileOpen(false)} sx={{ textAlign: 'center', py: 2 }}>
            <Box sx={{ my: 2, mb: 3 }}>
                <img src={dragonBallImage} style={{ maxWidth: '50px', height: 'auto' }} alt="Dragon Ball" />
            </Box>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton 
                            component={Link} 
                            to={item.path} 
                            sx={{ 
                                textAlign: 'center',
                                '&:hover': {
                                    backgroundColor: 'rgba(254, 158, 13, 0.08)',
                                }
                            }}
                        >
                            <ListItemText 
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                    color: '#2A2E35'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar 
                position="static" 
                sx={{ 
                    backgroundColor: 'white', 
                    color: '#2A2E35',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    borderBottom: '1px solid #f0f0f0'
                }}
            >
                <Toolbar sx={{ py: 1 }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            mr: 2,
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            }
                        }}
                    >
                        <img
                            src={dragonBallImage}
                            style={{ width: '40px', height: 'auto', marginRight: '8px' }}
                            alt="Dragon Ball"
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: '1.3rem',
                            letterSpacing: '0.5px',
                        }}
                    >
                        Dragon Ball
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                color="inherit"
                                sx={{ 
                                    fontWeight: 600, 
                                    fontSize: '0.95rem', 
                                    px: 2,
                                    py: 1,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: '50%',
                                        width: 0,
                                        height: '2px',
                                        backgroundColor: '#fe9e0d',
                                        transform: 'translateX(-50%)',
                                        transition: 'width 0.3s ease',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    }
                                }}
                                component={Link}
                                to={item.path}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{ display: { sm: 'none' } }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
