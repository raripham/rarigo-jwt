import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6">CloudFlare API</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
