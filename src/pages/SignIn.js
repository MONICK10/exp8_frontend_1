import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Submitting login form with email:', email); // Debug log
      const data = await api.login(email, password);
      console.log('Login successful:', data); // Debug log

      if (!data || !data.token || !data.role) {
        throw new Error('Invalid response from server');
      }

      login(data.token, data.role);
      console.log('Role:', data.role); // Debug log

      if (data.role === 'admin') {
        console.log('Navigating to admin dashboard'); // Debug log
        navigate('/admin/dashboard');
      } else {
        console.log('Navigating to client dashboard'); // Debug log
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      setError(error.response?.data?.message || error.message || 'An error occurred');
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
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              onClick={() => navigate('/forgot-password')}
              sx={{ textTransform: 'none' }}
            >
              Forgot Password?
            </Button>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Button
                onClick={() => navigate('/signup')}
                sx={{ textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}