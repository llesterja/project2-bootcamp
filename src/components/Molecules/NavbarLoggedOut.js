import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Flex item for pages */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                gap: '1rem',
              }}
            >
              <Button color="inherit">Home</Button>
              <Button color="inherit">Surprise Me</Button>
            </Box>
          </Box>

          {/* Flex item for buttons */}
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mr: 1 }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
