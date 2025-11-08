import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

import ResumeViewDialog from '../components/ResumeViewDialog';

export default function AdminDashboard() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/');
    }
  }, [token, role, navigate]);

  const fetchResumes = async () => {
    try {
      if (!token) {
        setError('No authentication token available');
        return;
      }

      setLoading(true);
      setError(null);
      console.log('Fetching resumes with token:', token); // Debug log
      const response = await api.getAllResumes(token);
      console.log('API Response:', response); // Debug log

      if (response.data && Array.isArray(response.data.data)) {
        setResumes(response.data.data);
      } else {
        console.error('Invalid response format:', response);
        setError('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error fetching resumes:', error.response || error);
      setError(error.response?.data?.message || 'Failed to fetch resumes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteResume(id, token);
      setResumes(resumes.filter(resume => resume._id !== id));
      alert('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume. Please try again.');
    }
  };

  const handleView = async (id) => {
    try {
      const resume = await api.viewResume(id, token);
      setSelectedResume(resume);
      setViewDialogOpen(true);
    } catch (error) {
      console.error('Error viewing resume:', error);
      alert('Failed to load resume details');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard - Monick's Resume Builder
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography>Loading resumes...</Typography>
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography color="error">{error}</Typography>
          </Box>
        ) : resumes.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography>No resumes found.</Typography>
          </Box>
        ) : (
          <Paper sx={{ width: '100%', mb: 2, overflowX: 'auto' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resumes.map((resume) => (
                    <TableRow key={resume._id}>
                      <TableCell>{resume.name}</TableCell>
                      <TableCell>{resume.email}</TableCell>
                      <TableCell>
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          onClick={() => handleView(resume._id)}
                          color="primary"
                          title="View Resume"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this resume?')) {
                              handleDelete(resume._id);
                            }
                          }}
                          color="error"
                          title="Delete Resume"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
      
      {/* Resume View Dialog */}
      <ResumeViewDialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        resume={selectedResume}
      />
    </Box>
  );
}