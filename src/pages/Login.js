// src/pages/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, Alert, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, logout, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      logout(); // Clear the token if already authenticated
    }
  }, [isAuthenticated, logout]);

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { email, password } = loginDetails;
    if (!email || !password) {
      setError('Both fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://timesheet-backend-a289.vercel.app/api/employee/login', loginDetails);
  
        setSuccess('Login successful!');
        setError('');
  
        // Save user data including companyId and userId in localStorage
        localStorage.setItem('user', JSON.stringify({
          token: response.data.token,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          userId: response.data._id,      // Store the user ID
          companyId: response.data.companyId // Store the company ID
        }));
  
        // Call login to update the auth context with new details
        login({
          token: response.data.token,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          userId: response.data._id,
          companyId: response.data.companyId
        });
  
        // Redirect to home page after successful login
        navigate('/home');
      } catch (error) {
        setError('Login failed. Please try again.');
      }
    }
  };
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #1d1e42 0%, #4b4b8f 100%)' }}>
      <Container maxWidth="xs" sx={{ backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 3, padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: '2rem' }}>
          Participant Login
        </Typography>
        {error && <Alert severity="error" style={{ marginBottom: '16px' }}>{error}</Alert>}
        {success && <Alert severity="success" style={{ marginBottom: '16px' }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                type="email"
                value={loginDetails.email}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Company Email"
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#f5f5f5' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                type="password"
                value={loginDetails.password}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Password"
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#f5f5f5' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#4b4b8f', color: '#FFFFFF', '&:hover': { backgroundColor: '#3e3e7a' }, padding: '10px 0' }}
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
