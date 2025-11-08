import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';

export default function ResumeViewDialog({ open, onClose, resume }) {
  if (!resume) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div" gutterBottom>
          {resume.name}'s Resume
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Contact Information
          </Typography>
          <Typography>Email: {resume.email}</Typography>
          <Typography>Phone: {resume.phone}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Career Objective
          </Typography>
          <Typography>{resume.objective}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {resume.skills.map((skill, index) => (
              <Chip key={index} label={skill} variant="outlined" />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Education
          </Typography>
          {resume.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                {edu.degree} in {edu.field}
              </Typography>
              <Typography>{edu.institution}</Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.year}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Experience
          </Typography>
          {resume.experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                {exp.position} at {exp.company}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.duration}
              </Typography>
              <Typography>{exp.description}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Projects
          </Typography>
          {resume.projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                {project.name}
              </Typography>
              <Typography>{project.description}</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {project.technologies.map((tech, i) => (
                  <Chip key={i} label={tech} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}