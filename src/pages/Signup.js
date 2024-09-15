import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Alert, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Signup = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    address: '',
    email: '',
    city: '',
    state: '',
    zipcode: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
const {id} = useParams()
  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { companyName, address, email, city, state, zipcode, password, confirmPassword } = companyDetails;
  
    if (!companyName || !address || !email || !city || !state || !zipcode || !password || !confirmPassword) {
      setError('All fields are required.');
      return false;
    }
  
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return false;
    }
  
    // Numeric ZIP code validation
    const zipCodeRegex = /^\d+$/;
    if (!zipCodeRegex.test(zipcode)) {
      setError('Please enter a valid numeric ZIP code.');
      return false;
    }
  
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
  
    setError('');
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://timesheet-backend-a289.vercel.app/api/auth/signup', companyDetails);
        console.log(response)
        setSuccess('Signup successful!');
        setError('');
        // Optionally, navigate to the login page or dashboard after successful signup
        navigate('/login');
      } catch (error) {
        setError('Signup failed. Please try again.');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Employee Signup
      </Typography>
      <div style={{ width: '100%' }}>
        {error && <Alert severity="error" style={{ marginBottom: '16px' }}>{error}</Alert>}
        {success && <Alert severity="success" style={{ marginBottom: '16px' }}>{success}</Alert>}
      </div>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Participant Name"
              name="companyName"
              value={companyDetails.companyName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={companyDetails.address}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={companyDetails.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={companyDetails.city}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              name="state"
              value={companyDetails.state}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip Code"
              name="zipcode"
              value={companyDetails.zipcode}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={companyDetails.password}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={companyDetails.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // name="email"
              label="Company Name"
              type="text"
              value={id}
              onChange={handleChange}
              fullWidth
              disabled
              required
            
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Already have an account? <Link href="/login" variant="body2">Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Signup;
