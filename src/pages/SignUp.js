import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Alert, MenuItem } from '@mui/material';
import * as api from '../services/api';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'client'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.register(formData);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoFocus
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            name="role"
            label="Role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Button
                onClick={() => navigate('/')}
                sx={{ textTransform: 'none' }}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}