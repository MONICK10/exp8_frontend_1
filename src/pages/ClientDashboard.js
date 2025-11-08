import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

export default function ClientDashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    objective: '',
    skills: '',
    education: [],
    experience: [],
    projects: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', field: '', year: '' }]
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', technologies: '' }]
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));

  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));

  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      projects: newProjects
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createResume(formData, token);
      alert('Resume created successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Monick's Resume Builder
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ p: 3 }}>
        {/* Form Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h5" gutterBottom>
              Create Resume
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Career Objective"
                name="objective"
                multiline
                rows={4}
                value={formData.objective}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Skills (comma-separated)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
              />

              {/* Education Section */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Education
                </Typography>
                {formData.education.map((edu, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Field"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                      required
                    />
                    <IconButton onClick={() => {
                      const newEducation = formData.education.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, education: newEducation }));
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button variant="outlined" onClick={addEducation}>
                  Add Education
                </Button>
              </Box>

              {/* Experience Section */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Experience
                </Typography>
                {formData.experience.map((exp, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Position"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Duration"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Description"
                      multiline
                      rows={3}
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      required
                    />
                    <IconButton onClick={() => {
                      const newExperience = formData.experience.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, experience: newExperience }));
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button variant="outlined" onClick={addExperience}>
                  Add Experience
                </Button>
              </Box>

              {/* Projects Section */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Projects
                </Typography>
                {formData.projects.map((project, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Project Name"
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Description"
                      multiline
                      rows={3}
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Technologies Used"
                      value={project.technologies}
                      onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                      required
                    />
                    <IconButton onClick={() => {
                      const newProjects = formData.projects.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, projects: newProjects }));
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button variant="outlined" onClick={addProject}>
                  Add Project
                </Button>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                Create Resume
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}