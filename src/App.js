import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#283593',
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { token, role } = useAuth();
  
  if (!token) {
    return <Navigate to="/" />;
  }

  // Redirect to appropriate dashboard based on role
  if (role === 'admin' && allowedRole !== 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }
  
  if (role === 'client' && allowedRole !== 'client') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRole="client">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
