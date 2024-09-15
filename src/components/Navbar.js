import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user'); // Clear user data from local storage
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#FFFFFF' }}>
        FastNDigital
      </Typography>
      <List>
        <ListItem button onClick={() => navigate('/home')}>
          <ListItemIcon><MenuIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
          <ListItemText primary="Home" sx={{ color: '#FFFFFF' }} />
        </ListItem>
        <ListItem button onClick={() => navigate('/about')}>
          <ListItemIcon><MenuIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
          <ListItemText primary="About" sx={{ color: '#FFFFFF' }} />
        </ListItem>
        <ListItem button onClick={() => navigate('/contact')}>
          <ListItemIcon><MenuIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
          <ListItemText primary="Contact" sx={{ color: '#FFFFFF' }} />
        </ListItem>
        {isAuthenticated && (
          <>
            <ListItem button onClick={() => navigate('/manage-user')}>
              <ListItemIcon><ManageAccountsIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
              <ListItemText primary="Manage User" sx={{ color: '#FFFFFF' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/create-user')}>
              <ListItemIcon><PersonAddIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
              <ListItemText primary="Create User" sx={{ color: '#FFFFFF' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/share')}>
              <ListItemIcon><ShareIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
              <ListItemText primary="Share" sx={{ color: '#FFFFFF' }} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: '#FFFFFF' }} />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: '#25254f',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: '#FFFFFF', cursor: 'pointer' }}
            onClick={() => navigate('/home')}
          >
            FastNDigital
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <Avatar sx={{ bgcolor: '#FFFFFF', mr: 2 }}>
                  {user ? `${user.firstName[0]}${user.lastName[0]}` : ''}
                </Avatar>
                <Typography
                  variant="body1"
                  sx={{ color: '#FFFFFF', display: 'inline', mr: 2 }}
                >
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </Typography>
                <Button sx={{ color: '#FFFFFF' }} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button sx={{ color: '#FFFFFF' }} onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
                <Button sx={{ color: '#FFFFFF' }} onClick={() => navigate('/login')}>
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: '#25254f',
            color: '#FFFFFF',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
