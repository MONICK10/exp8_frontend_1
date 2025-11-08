import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';
import * as api from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: OTP & new password
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await api.forgotPassword(email);
      setMessage('OTP has been sent to your email');
      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await api.resetPassword(email, otp, newPassword);
      setMessage('Password has been reset successfully');
      setTimeout(() => navigate('/'), 2000);
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
          Reset Password
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        
        {step === 1 ? (
          <Box component="form" onSubmit={handleSendOTP} sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Enter OTP"
              name="otp"
              autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        )}
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Remember your password?{' '}
            <Button
              onClick={() => navigate('/')}
              sx={{ textTransform: 'none' }}
            >
              Sign In
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}