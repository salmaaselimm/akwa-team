import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, Container, Button, TextField, MenuItem, Input, Table, TableBody, TableCell, TableHead, TableRow, Modal, Select, FormControl, InputLabel, Alert } from '@mui/material';
import { motion } from 'framer-motion';

// Define a new color scheme with neon yellowish-green
const theme = createTheme({
  palette: {
    primary: {
      main: '#C6FF00', // Neon yellowish-green
    },
    background: {
      default: '#1A1A1A', // Dark base similar to Handshake
      paper: '#2D2D2D', // Slightly lighter dark for contrast
    },
    text: {
      primary: '#FFFFFF', // White text for readability on dark background
      secondary: '#B0BEC5', // Light gray for secondary text
    },
  },
  typography: {
    fontFamily: 'Montserrat, Inter, Roboto, sans-serif', // Fallback for GUC Internship System
    h4: {
      fontWeight: 700,
      fontStyle: 'italic', // Mimic Handshake logo style
    },
    h1: {
      fontFamily: 'Bebas Neue, Impact, sans-serif', // Fallback for Careers Start Here
      fontWeight: 900,
      textTransform: 'uppercase', // Match Handshake's headline style
    },
    body1: {
      fontWeight: 400,
    },
  },
});

// Mock data storage for company applications, students, reports, evaluation reports, appointments, and internship cycle
const useMockData = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      companyName: 'CIB',
      industry: 'Banks',
      companySize: 'corporate',
      companyEmail: 'contact@cib.com',
      companyLogo: null,
      taxDocuments: null,
      status: 'Pending',
    },
    {
      id: 2,
      companyName: 'EG Bank',
      industry: 'Banks',
      companySize: 'large',
      companyEmail: 'contact@egbank.com',
      companyLogo: null,
      taxDocuments: null,
      status: 'Pending',
    },
    {
      id: 3,
      companyName: 'Orange',
      industry: 'Telecommunications',
      companySize: 'corporate',
      companyEmail: 'contact@orange.com',
      companyLogo: null,
      taxDocuments: null,
      status: 'Pending',
    },
    {
      id: 4,
      companyName: 'Vodafone',
      industry: 'Telecommunications',
      companySize: 'corporate',
      companyEmail: 'contact@vodafone.com',
      companyLogo: null,
      taxDocuments: null,
      status: 'Pending',
    },
  ]);
 
const [internships, setInternships] = useState([
  {
    id: 1,
    studentId: 1, // Ali Saied
    title: "Software Engineer Intern",
    company: "Vodafone",
    startDate: "2024-06-01",
    endDate: "2024-08-01",
    status: "completed",
    skills: ["JavaScript", "React", "Node.js"]
  },
  {
    id: 2,
    studentId: 2, // Abubakr Khaled
    title: "Network Engineer Intern",
    company: "Orange",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "completed",
    skills: ["Networking", "TCP/IP", "Linux"]
  },
  {
    id: 3,
    studentId: 1, // Ali Saied (current)
    title: "AI Research Intern",
    company: "Google",
    startDate: "2025-05-15",
    endDate: "", // Ongoing
    status: "current",
    skills: ["Python", "Machine Learning", "TensorFlow"]
  }
]);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Ali Saied',
      status: 'Current Intern',
      profile: {
        major: 'Computer Science',
        semester: 6,
        jobInterests: 'Software Development, AI',
        previousInternships: 'Intern at Vodafone (Summer 2024, 2 months, Software Engineer)',
      },
    },
    {
      id: 2,
      name: 'Abubakr Khaled',
      status: 'Internship Complete',
      profile: {
        major: 'Engineering',
        semester: 8,
        jobInterests: 'Telecommunications, Project Management',
        previousInternships: 'Intern at Orange (Summer 2023, 3 months, Network Engineer)',
      },
    },
    {
      id: 3,
      name: 'Amr Haitham',
      status: 'Applied',
      profile: {
        major: 'Business Informatics',
        semester: 5,
        jobInterests: 'Data Analysis, Finance',
        previousInternships: 'None',
      },
    },
    {
      id: 4,
      name: 'Salma Khaled',
      status: 'No Internship',
      profile: {
        major: 'Pharmacy',
        semester: 7,
        jobInterests: 'Research, Healthcare',
        previousInternships: 'None',
      },
    },
    {
      id: 5,
      name: 'Ahmed Adham',
      status: 'Internship Complete',
      profile: {
        major: 'Computer Science',
        semester: 8,
        jobInterests: 'Cybersecurity, Software Development',
        previousInternships: 'Intern at CIB (Summer 2023, 3 months, Security Analyst)',
      },
    },
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      studentName: 'Abubakr Khaled',
      major: 'Engineering',
      title: 'Internship Experience at Orange',
      content: 'Introduction: My internship at Orange was insightful...\nBody: I worked on network optimization projects...\nConclusion: Gained valuable experience in telecommunications.',
      submissionDate: '2024-09-15',
      status: 'Pending',
    },
    {
      id: 2,
      studentName: 'Ahmed Adham',
      major: 'Computer Science',
      title: 'Security Analysis Internship at CIB',
      content: 'Introduction: I joined CIB as a security analyst intern...\nBody: I conducted vulnerability assessments...\nConclusion: Improved my cybersecurity skills.',
      submissionDate: '2024-09-20',
      status: 'Accepted',
    },
    {
      id: 3,
      studentName: 'Ali Saied',
      major: 'Computer Science',
      title: 'Software Development at Vodafone',
      content: 'Introduction: My time at Vodafone was productive...\nBody: I developed a new feature for their app...\nConclusion: Learned modern development practices.',
      submissionDate: '2024-09-25',
      status: 'Rejected',
    },
    {
      id: 4,
      studentName: 'Amr Haitham',
      major: 'Business Informatics',
      title: 'Data Analysis Internship at EG Bank',
      content: 'Introduction: I interned at EG Bank...\nBody: I analyzed financial data...\nConclusion: Improved my analytical skills.',
      submissionDate: '2024-09-30',
      status: 'Flagged',
    },
  ]);

  const [evaluationReports, setEvaluationReports] = useState([
    {
      id: 1,
      studentName: 'Abubakr Khaled',
      companyName: 'Orange',
      supervisor: 'Mohamed Ali',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      evaluation: 'Excellent performance, highly recommended.',
    },
    {
      id: 2,
      studentName: 'Ahmed Adham',
      companyName: 'CIB',
      supervisor: 'Fatima Hassan',
      startDate: '2023-06-15',
      endDate: '2023-09-15',
      evaluation: 'Good effort, needs improvement in time management.',
    },
    {
      id: 3,
      studentName: 'Ali Saied',
      companyName: 'Vodafone',
      supervisor: 'Sara Ahmed',
      startDate: '2024-06-01',
      endDate: '2024-08-01',
      evaluation: 'Very dedicated, great teamwork.',
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      participant: 'Ali Saied',
      type: 'Student',
      date: '2025-05-15',
      time: '10:00',
      status: 'Scheduled',
    },
    {
      id: 2,
      participant: 'Orange',
      type: 'Company',
      date: '2025-05-20',
      time: '14:00',
      status: 'Completed',
    },
  ]);

  const [internshipCycle, setInternshipCycle] = useState({
    startDate: '2025-05-01',
    endDate: '2025-08-31',
  });

  return { applications, setApplications, students, setStudents, reports, setReports, evaluationReports, setEvaluationReports, appointments, setAppointments, internshipCycle, setInternshipCycle };
};

// Sidebar Component
const Sidebar = () => {
  const drawerWidth = 240;
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box', 
          backgroundColor: '#2D2D2D',
          borderRight: '1px solid #C6FF00',
        },
      }}
    >
      <Toolbar />
      <List>
        {['Home', 'Companies', 'Internships', 'Students', 'Reports', 'Appointments'].map((text) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
            <ListItemText primary={text} sx={{ color: '#FFFFFF' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

// Header Component
const Header = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        backgroundColor: '#1A1A1A',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: '#FFFFFF', flexGrow: 1 }}>
          GUC Internship System
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#C6FF00', 
            color: '#1A1A1A', 
            borderRadius: '20px',
            textTransform: 'none',
            mr: 2,
            '&:hover': { backgroundColor: '#AEEA00' },
          }}
          component={Link}
          to="/signin"
        >
          Sign In
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#C6FF00', 
            color: '#1A1A1A', 
            borderRadius: '20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#AEEA00' },
          }}
          component={Link}
          to="/register-company"
        >
          Register as a Company
        </Button>
      </Toolbar>
    </AppBar>
  );
};

// Home Page Component with Handshake-inspired Design
const Home = () => {
  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.3, duration: 0.8 },
    }),
  };

  return (
    <Box sx={{ mt: 0, p: 0 }}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#1A1A1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={fadeInScale}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#C6FF00',
                fontWeight: 700,
                fontStyle: 'italic',
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              GUC Internship System
            </Typography>
          </motion.div>
          <motion.div
            variants={fadeInScale}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Box sx={{ display: 'block' }}>
              <Typography
                variant="h1"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: { xs: '3rem', md: '6rem' },
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                Careers
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: { xs: '3rem', md: '6rem' },
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                Start Here
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

// Sign In Page Component with Mock Authentication
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = {
      student12: { password: 'student12', role: 'student', redirect: '/student-dashboard' },
      studentpro: { password: 'studentpro', role: 'pro-student', redirect: '/pro-student-dashboard' },
      company12: { password: 'company12', role: 'company', redirect: '/company-dashboard' },
      scad12: { password: 'scad12', role: 'scad', redirect: '/scad-dashboard' },
      fac12: { password: 'fac12', role: 'faculty', redirect: '/faculty-dashboard' },
    };

    if (users[username] && users[username].password === password) {
      navigate(users[username].redirect);
    } else {
      setError('Invalid username or password');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF' }}>
            Sign In
          </Typography>
        </motion.div>
        <Box
          sx={{
            maxWidth: '400px',
            mx: 'auto',
            p: 3,
            backgroundColor: '#2D2D2D',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={1}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' } }}
            />
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={2}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' } }}
            />
          </motion.div>
          {error && (
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={3}>
              <Typography sx={{ color: '#FF6F61', mt: 1 }}>{error}</Typography>
            </motion.div>
          )}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#C6FF00',
                color: '#1A1A1A',
                borderRadius: '20px',
                textTransform: 'none',
                mt: 2,
                px: 4,
                py: 1,
                '&:hover': { backgroundColor: '#AEEA00' },
              }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

// Register Company Page Component
const RegisterCompany = ({ setApplications }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    companyLogo: null,
    companyEmail: '',
    taxDocuments: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.companyName || !formData.industry || !formData.companySize || !formData.companyEmail || !formData.taxDocuments) {
      setError('All fields are required');
      return;
    }
    setApplications((prev) => [
      ...prev,
      { ...formData, status: 'Pending', id: Date.now() },
    ]);
    navigate('/company-dashboard');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0}>
          <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF' }}>
            Register as a Company
          </Typography>
        </motion.div>
        <Box
          component="form"
          sx={{
            maxWidth: '500px',
            mx: 'auto',
            p: 3,
            backgroundColor: '#2D2D2D',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={1}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              variant="outlined"
              margin="normal"
              value={formData.companyName}
              onChange={handleChange}
              sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' } }}
            />
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={2}>
            <TextField
              fullWidth
              label="Industry"
              name="industry"
              variant="outlined"
              margin="normal"
              value={formData.industry}
              onChange={handleChange}
              sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' } }}
            />
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={3}>
            <TextField
              fullWidth
              select
              label="Company Size"
              name="companySize"
              variant="outlined"
              margin="normal"
              value={formData.companySize}
              onChange={handleChange}
              sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' } }}
            >
              <MenuItem value="small">Small (50 employees or less)</MenuItem>
              <MenuItem value="medium">Medium (more than 50, less than or equal to 100 employees)</MenuItem>
              <MenuItem value="large">Large (more than 100, less than or equal to 500 employees)</MenuItem>
              <MenuItem value="corporate">Corporate (more than 500 employees)</MenuItem>
            </TextField>
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={4}>
            <TextField
              fullWidth
              type="file"
              label="Company Logo"
              name="companyLogo"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: 'image/*' }}
              onChange={handleChange}
              sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' } }}
            />
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={5}>
            <TextField
              fullWidth
              label="Official Company Email"
              name="companyEmail"
              type="email"
              variant="outlined"
              margin="normal"
              value={formData.companyEmail}
              onChange={handleChange}
              sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' } }}
            />
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={6}>
            <TextField
              fullWidth
              type="file"
              label="Upload Tax Documents"
              name="taxDocuments"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf,.doc,.docx' }}
              onChange={handleChange}
              sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' } }}
            />
          </motion.div>
          {error && (
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={7}>
              <Typography sx={{ color: '#FF6F61', mt: 1 }}>{error}</Typography>
            </motion.div>
          )}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={8}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#C6FF00',
                color: '#1A1A1A',
                borderRadius: '20px',
                textTransform: 'none',
                mt: 2,
                px: 4,
                py: 1,
                '&:hover': { backgroundColor: '#AEEA00' },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

// Statistics Page Component
const StatisticsPage = ({ reports, students, evaluationReports, internshipCycle }) => {
  const navigate = useNavigate();

  // Calculate statistics
  const reportStats = {
    pending: reports.filter((report) => report.status === 'Pending').length,
    accepted: reports.filter((report) => report.status === 'Accepted').length,
    rejected: reports.filter((report) => report.status === 'Rejected').length,
    flagged: reports.filter((report) => report.status === 'Flagged').length,
  };

  // Mock average review time (in days)
  const averageReviewTime = 5; // Placeholder value

  // Most frequently used courses (majors)
  const majorCounts = students.reduce((acc, student) => {
    const major = student.profile.major;
    acc[major] = (acc[major] || 0) + 1;
    return acc;
  }, {});
  const mostFrequentMajor = Object.keys(majorCounts).reduce((a, b) =>
    majorCounts[a] > majorCounts[b] ? a : b
  );

  // Top companies by internship count
  const companyCounts = evaluationReports.reduce((acc, report) => {
    const company = report.companyName;
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {});
  const topCompanyByInternships = Object.keys(companyCounts).reduce((a, b) =>
    companyCounts[a] > companyCounts[b] ? a : b
  );

  // Mock top-rated companies (since we don't have ratings)
  const topRatedCompany = 'Orange'; // Placeholder

  const statsData = {
    reportStats,
    averageReviewTime,
    mostFrequentMajor,
    topCompanyByInternships,
    topRatedCompany,
    internshipCycle,
  };

  const handleDownloadReport = () => {
    const blob = new Blob([JSON.stringify(statsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `internship-stats-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ mt: 4, p: 3 }}>
      <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
        Statistics
      </Typography>
      <Typography sx={{ color: '#B0BEC5', mt: 2 }}>
        Real-time insights for the current internship cycle.
      </Typography>
      <Box sx={{ backgroundColor: '#2D2D2D', p: 3, borderRadius: '8px', mt: 4 }}>
        <Typography sx={{ color: '#FFFFFF' }}>
          <strong>Reports per Cycle:</strong> Accepted: {reportStats.accepted}, Rejected: {reportStats.rejected}, Flagged: {reportStats.flagged}, Pending: {reportStats.pending}
        </Typography>
        <Typography sx={{ color: '#FFFFFF', mt: 1 }}>
          <strong>Average Review Time:</strong> {averageReviewTime} days
        </Typography>
        <Typography sx={{ color: '#FFFFFF', mt: 1 }}>
          <strong>Most Frequent Major:</strong> {mostFrequentMajor} ({majorCounts[mostFrequentMajor]} students)
        </Typography>
        <Typography sx={{ color: '#FFFFFF', mt: 1 }}>
          <strong>Top Company by Internships:</strong> {topCompanyByInternships} ({companyCounts[topCompanyByInternships]} internships)
        </Typography>
        <Typography sx={{ color: '#FFFFFF', mt: 1 }}>
          <strong>Top-Rated Company:</strong> {topRatedCompany}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#C6FF00',
            color: '#1A1A1A',
            mt: 2,
            '&:hover': { backgroundColor: '#AEEA00' },
          }}
          onClick={handleDownloadReport}
        >
          Download Report
        </Button>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#C6FF00',
          color: '#1A1A1A',
          mt: 4,
          '&:hover': { backgroundColor: '#AEEA00' },
        }}
        component={Link}
        to="/scad-dashboard"
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

// Video Call Page Component
const VideoCallPage = ({ appointments }) => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const appointment = appointments.find((a) => a.id === parseInt(id)) || appointments[0]; // Find the appointment
  const [isMuted, setIsMuted] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [notification, setNotification] = useState('');

  const startCall = () => {
    setIsCallActive(true);
    setNotification(`Video call with ${appointment.participant} has started!`);
    setTimeout(() => setNotification(''), 5000); // Clear notification after 5 seconds
  };

  const endCall = () => {
    setIsCallActive(false);
    setNotification(`Video call with ${appointment.participant} has ended.`);
    setTimeout(() => setNotification(''), 5000);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setNotification(`Microphone ${isMuted ? 'unmuted' : 'muted'}.`);
    setTimeout(() => setNotification(''), 5000);
  };

  if (!appointment) {
    return (
      <Box sx={{ mt: 4, p: 3 }}>
        <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
          Appointment Not Found
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#C6FF00', color: '#1A1A1A', mt: 4, '&:hover': { backgroundColor: '#AEEA00' } }}
          component={Link}
          to="/appointments"
        >
          Back to Appointments
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, p: 3 }}>
      <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
        Video Call with {appointment.participant}
      </Typography>
      {notification && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {notification}
        </Alert>
      )}
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: '600px', height: '400px', backgroundColor: '#2D2D2D', borderRadius: '8px', mb: 2 }}>
          {/* Mock video feed - replace with real WebRTC stream in production */}
          <video
            autoPlay
            muted={isMuted}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!isCallActive && (
            <Button
              variant="contained"
              sx={{ backgroundColor: '#4CAF50', color: '#FFFFFF', '&:hover': { backgroundColor: '#45A049' } }}
              onClick={startCall}
            >
              Start Call
            </Button>
          )}
          {isCallActive && (
            <>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#F44336', color: '#FFFFFF', '&:hover': { backgroundColor: '#D32F2F' } }}
                onClick={endCall}
              >
                End Call
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: isMuted ? '#C6FF00' : '#FF9800', color: '#1A1A1A', '&:hover': { backgroundColor: isMuted ? '#AEEA00' : '#F57C00' } }}
                onClick={toggleMute}
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#C6FF00', color: '#1A1A1A', mt: 4, '&:hover': { backgroundColor: '#AEEA00' } }}
        component={Link}
        to="/appointments"
      >
        Back to Appointments
      </Button>
    </Box>
  );
};

// SCAD Office Dashboard with Appointments
const ScadDashboard = ({ applications, setApplications, students, reports, evaluationReports, appointments, setAppointments, internshipCycle, setInternshipCycle }) => {
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [startDate, setStartDate] = useState(internshipCycle.startDate);
  const [endDate, setEndDate] = useState(internshipCycle.endDate);
  const [reportMajorFilter, setReportMajorFilter] = useState('');
  const [reportStatusFilter, setReportStatusFilter] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({ participant: '', type: 'Student', date: '', time: '' });
  const navigate = useNavigate();

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.companyName.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industryFilter ? app.industry === industryFilter : true;
    return matchesSearch && matchesIndustry;
  });

  const industries = [...new Set(applications.map((app) => app.industry))];

  const filteredStudents = students.filter((student) => {
    return statusFilter ? student.status === statusFilter : true;
  });

  const statuses = [...new Set(students.map((student) => student.status))];

  const filteredReports = reports.filter((report) => {
    const matchesMajor = reportMajorFilter ? report.major === reportMajorFilter : true;
    const matchesStatus = reportStatusFilter ? report.status === reportStatusFilter : true;
    return matchesMajor && matchesStatus;
  });

  const majors = [...new Set(students.map((student) => student.profile.major))];
  const reportStatuses = ['Pending', 'Accepted', 'Rejected', 'Flagged'];

  const handleAccept = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'Accepted' } : app
      )
    );
  };

  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'Rejected' } : app
      )
    );
  };

  const handleSetCycle = () => {
    setInternshipCycle({ startDate, endDate });
  };

  const handleScheduleAppointment = () => {
    if (!newAppointment.participant || !newAppointment.date || !newAppointment.time) {
      alert('All fields are required');
      return;
    }
    setAppointments((prev) => [
      ...prev,
      { ...newAppointment, id: Date.now(), status: 'Scheduled' },
    ]);
    setNewAppointment({ participant: '', type: 'Student', date: '', time: '' });
  };

  const handleNotify = (appointmentId) => {
    const appointment = appointments.find((a) => a.id === appointmentId);
    alert(`Notification sent to ${appointment.participant} for appointment on ${appointment.date} at ${appointment.time}`);
  };

  return (
    <Box sx={{ mt: 4, p: 3 }}>
      <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
        SCAD Office Dashboard
      </Typography>
      <Typography sx={{ color: '#B0BEC5', mt: 2 }}>
        Manage company applications, students, reports, appointments, and internship cycles.
      </Typography>

      {/* Internship Cycle Section */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2 }}>
          Set Internship Cycle
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' }, width: '200px' }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' }, width: '200px' }}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#C6FF00',
              color: '#1A1A1A',
              '&:hover': { backgroundColor: '#AEEA00' },
            }}
            onClick={handleSetCycle}
          >
            Set Cycle
          </Button>
        </Box>
        <Typography sx={{ color: '#B0BEC5' }}>
          Current Cycle: {internshipCycle.startDate} to {internshipCycle.endDate}
        </Typography>
      </Box>

      {/* Navigation to Statistics */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#C6FF00',
            color: '#1A1A1A',
            '&:hover': { backgroundColor: '#AEEA00' },
          }}
          component={Link}
          to="/statistics"
        >
          View Statistics
        </Button>
      </Box>

      {/* Company Applications Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2 }}>
          Company Applications
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Search by Company Name"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' }, width: '300px' }}
          />
          <FormControl sx={{ width: '200px' }}>
            <InputLabel sx={{ color: '#B0BEC5' }}>Filter by Industry</InputLabel>
            <Select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              sx={{ color: '#FFFFFF' }}
            >
              <MenuItem value="">All</MenuItem>
              {industries.map((industry) => (
                <MenuItem key={industry} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Table sx={{ backgroundColor: '#2D2D2D', mb: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#FFFFFF' }}>Company Name</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Industry</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Status</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell sx={{ color: '#FFFFFF' }}>{app.companyName}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{app.industry}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{app.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#C6FF00',
                      color: '#1A1A1A',
                      mr: 1,
                      '&:hover': { backgroundColor: '#AEEA00' },
                    }}
                    onClick={() => setSelectedCompany(app)}
                  >
                    View Details
                  </Button>
                  {app.status === 'Pending' && (
                    <>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#4CAF50',
                          color: '#FFFFFF',
                          mr: 1,
                          '&:hover': { backgroundColor: '#45A049' },
                        }}
                        onClick={() => handleAccept(app.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#F44336',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#D32F2F' },
                        }}
                        onClick={() => handleReject(app.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Students Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2 }}>
          Students
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ width: '200px' }}>
            <InputLabel sx={{ color: '#B0BEC5' }}>Filter by Internship Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ color: '#FFFFFF' }}
            >
              <MenuItem value="">All</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Table sx={{ backgroundColor: '#2D2D2D', mb: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#FFFFFF' }}>Student Name</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Internship Status</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell sx={{ color: '#FFFFFF' }}>{student.name}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{student.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#C6FF00',
                      color: '#1A1A1A',
                      '&:hover': { backgroundColor: '#AEEA00' },
                    }}
                    onClick={() => setSelectedStudent(student)}
                  >
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Submitted Reports Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2 }}>
          Submitted Reports
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ width: '200px' }}>
            <InputLabel sx={{ color: '#B0BEC5' }}>Filter by Major</InputLabel>
            <Select
              value={reportMajorFilter}
              onChange={(e) => setReportMajorFilter(e.target.value)}
              sx={{ color: '#FFFFFF' }}
            >
              <MenuItem value="">All</MenuItem>
              {majors.map((major) => (
                <MenuItem key={major} value={major}>
                  {major}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '200px' }}>
            <InputLabel sx={{ color: '#B0BEC5' }}>Filter by Status</InputLabel>
            <Select
              value={reportStatusFilter}
              onChange={(e) => setReportStatusFilter(e.target.value)}
              sx={{ color: '#FFFFFF' }}
            >
              <MenuItem value="">All</MenuItem>
              {reportStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Table sx={{ backgroundColor: '#2D2D2D', mb: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#FFFFFF' }}>Student Name</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Report Title</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Submission Date</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Status</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell sx={{ color: '#FFFFFF' }}>{report.studentName}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{report.title}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{report.submissionDate}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{report.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#C6FF00',
                      color: '#1A1A1A',
                      '&:hover': { backgroundColor: '#AEEA00' },
                    }}
                    onClick={() => setSelectedReport(report)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Evaluation Reports Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2 }}>
          Evaluation Reports
        </Typography>
        <Table sx={{ backgroundColor: '#2D2D2D' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#FFFFFF' }}>Student Name</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Company Name</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Supervisor</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluationReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell sx={{ color: '#FFFFFF' }}>{report.studentName}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{report.companyName}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{report.supervisor}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#C6FF00',
                      color: '#1A1A1A',
                      '&:hover': { backgroundColor: '#AEEA00' },
                    }}
                    onClick={() => setSelectedEvaluation(report)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Appointments Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2 }}>
          Appointments
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ width: '200px' }}>
            <InputLabel sx={{ color: '#B0BEC5' }}>Participant Type</InputLabel>
            <Select
              value={newAppointment.type}
              onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
              sx={{ color: '#FFFFFF' }}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Company">Company</MenuItem>
            </Select>
          </FormControl>
          <TextField
            select
            label="Participant"
            value={newAppointment.participant}
            onChange={(e) => setNewAppointment({ ...newAppointment, participant: e.target.value })}
            sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' }, width: '200px' }}
          >
            {newAppointment.type === 'Student' && students.map((student) => (
              <MenuItem key={student.id} value={student.name}>
                {student.name}
              </MenuItem>
            ))}
            {newAppointment.type === 'Company' && applications.map((app) => (
              <MenuItem key={app.id} value={app.companyName}>
                {app.companyName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date"
            type="date"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' }, width: '200px' }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            type="time"
            value={newAppointment.time}
            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            sx={{ input: { color: '#FFFFFF' }, label: { color: '#B0BEC5' }, width: '150px' }}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: '#C6FF00', color: '#1A1A1A', '&:hover': { backgroundColor: '#AEEA00' } }}
            onClick={handleScheduleAppointment}
          >
            Schedule Appointment
          </Button>
        </Box>
        <Table sx={{ backgroundColor: '#2D2D2D' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#FFFFFF' }}>Participant</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Type</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Date</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Time</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Status</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell sx={{ color: '#FFFFFF' }}>{appointment.participant}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{appointment.type}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{appointment.date}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{appointment.time}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{appointment.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#C6FF00', color: '#1A1A1A', mr: 1, '&:hover': { backgroundColor: '#AEEA00' } }}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    View Details
                  </Button>
                  {appointment.status === 'Scheduled' && (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#4CAF50', color: '#FFFFFF', '&:hover': { backgroundColor: '#45A049' } }}
                      onClick={() => handleNotify(appointment.id)}
                    >
                      Notify
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Modal for Company Details */}
      {selectedCompany && (
        <Modal open onClose={() => setSelectedCompany(null)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: '#2D2D2D',
              border: '1px solid #C6FF00',
              p: 4,
              color: '#FFFFFF',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Company Details
            </Typography>
            <Typography><strong>Name:</strong> {selectedCompany.companyName}</Typography>
            <Typography><strong>Industry:</strong> {selectedCompany.industry}</Typography>
            <Typography><strong>Size:</strong> {selectedCompany.companySize}</Typography>
            <Typography><strong>Email:</strong> {selectedCompany.companyEmail}</Typography>
            <Typography><strong>Logo:</strong> {selectedCompany.companyLogo ? selectedCompany.companyLogo.name : 'Not uploaded'}</Typography>
            <Typography><strong>Tax Documents:</strong> {selectedCompany.taxDocuments ? selectedCompany.taxDocuments.name : 'Not uploaded'}</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#C6FF00',
                color: '#1A1A1A',
                mt: 2,
                '&:hover': { backgroundColor: '#AEEA00' },
              }}
              onClick={() => setSelectedCompany(null)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}

      {/* Modal for Student Profile */}
      {selectedStudent && (
        <Modal open onClose={() => setSelectedStudent(null)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: '#2D2D2D',
              border: '1px solid #C6FF00',
              p: 4,
              color: '#FFFFFF',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Student Profile
            </Typography>
            <Typography><strong>Name:</strong> {selectedStudent.name}</Typography>
            <Typography><strong>Major:</strong> {selectedStudent.profile.major}</Typography>
            <Typography><strong>Semester:</strong> {selectedStudent.profile.semester}</Typography>
            <Typography><strong>Job Interests:</strong> {selectedStudent.profile.jobInterests}</Typography>
            <Typography><strong>Previous Internships:</strong> {selectedStudent.profile.previousInternships}</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#C6FF00',
                color: '#1A1A1A',
                mt: 2,
                '&:hover': { backgroundColor: '#AEEA00' },
              }}
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}

      {/* Modal for Report Details */}
      {selectedReport && (
        <Modal open onClose={() => setSelectedReport(null)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: '#2D2D2D',
              border: '1px solid #C6FF00',
              p: 4,
              color: '#FFFFFF',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Report Details
            </Typography>
            <Typography><strong>Student Name:</strong> {selectedReport.studentName}</Typography>
            <Typography><strong>Major:</strong> {selectedReport.major}</Typography>
            <Typography><strong>Title:</strong> {selectedReport.title}</Typography>
            <Typography><strong>Submission Date:</strong> {selectedReport.submissionDate}</Typography>
            <Typography><strong>Status:</strong> {selectedReport.status}</Typography>
            <Typography sx={{ mt: 2, whiteSpace: 'pre-wrap' }}><strong>Content:</strong> {selectedReport.content}</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#C6FF00',
                color: '#1A1A1A',
                mt: 2,
                '&:hover': { backgroundColor: '#AEEA00' },
              }}
              onClick={() => setSelectedReport(null)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}

      {/* Modal for Evaluation Report Details */}
      {selectedEvaluation && (
        <Modal open onClose={() => setSelectedEvaluation(null)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: '#2D2D2D',
              border: '1px solid #C6FF00',
              p: 4,
              color: '#FFFFFF',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Evaluation Report Details
            </Typography>
            <Typography><strong>Student Name:</strong> {selectedEvaluation.studentName}</Typography>
            <Typography><strong>Company Name:</strong> {selectedEvaluation.companyName}</Typography>
            <Typography><strong>Main Supervisor:</strong> {selectedEvaluation.supervisor}</Typography>
            <Typography><strong>Start Date:</strong> {selectedEvaluation.startDate}</Typography>
            <Typography><strong>End Date:</strong> {selectedEvaluation.endDate}</Typography>
            <Typography sx={{ mt: 2 }}><strong>Evaluation:</strong> {selectedEvaluation.evaluation}</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#C6FF00',
                color: '#1A1A1A',
                mt: 2,
                '&:hover': { backgroundColor: '#AEEA00' },
              }}
              onClick={() => setSelectedEvaluation(null)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}

      {/* Modal for Appointment Details */}
      {selectedAppointment && (
        <Modal open onClose={() => setSelectedAppointment(null)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: '#2D2D2D',
              border: '1px solid #C6FF00',
              p: 4,
              color: '#FFFFFF',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Appointment Details
            </Typography>
            <Typography><strong>Participant:</strong> {selectedAppointment.participant}</Typography>
            <Typography><strong>Type:</strong> {selectedAppointment.type}</Typography>
            <Typography><strong>Date:</strong> {selectedAppointment.date}</Typography>
            <Typography><strong>Time:</strong> {selectedAppointment.time}</Typography>
            <Typography><strong>Status:</strong> {selectedAppointment.status}</Typography>
            {selectedAppointment.status === 'Scheduled' && (
              <Button
                variant="contained"
                sx={{ backgroundColor: '#C6FF00', color: '#1A1A1A', mt: 2, mr: 1, '&:hover': { backgroundColor: '#AEEA00' } }}
                onClick={() => navigate(`/video-call/${selectedAppointment.id}`)}
              >
                Join Video Call
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ backgroundColor: '#C6FF00', color: '#1A1A1A', mt: 2, '&:hover': { backgroundColor: '#AEEA00' } }}
              onClick={() => setSelectedAppointment(null)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

const StudentDashboard = () => {
  const { internships } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  // Get current student ID from auth (mock for now)
  const currentStudentId = 1; // In real app, get from auth context

  const filteredInternships = internships
    .filter(internship => internship.studentId === currentStudentId)
    .filter(internship => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        internship.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || 
        internship.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

  return (
    <Box sx={{ mt: 4, p: 3 }}>
      <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
        My Internships
      </Typography>
      
      {/* Search and Filter Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, mt: 2 }}>
        <TextField
          label="Search by job title or company"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            flexGrow: 1,
            '& .MuiInputBase-root': { color: '#FFFFFF' },
            '& .MuiInputLabel-root': { color: '#B0BEC5' }
          }}
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: '#B0BEC5' }}>Filter by status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ color: '#FFFFFF' }}
          >
            <MenuItem value="all">All Internships</MenuItem>
            <MenuItem value="current">Current Internship</MenuItem>
            <MenuItem value="completed">Completed Internships</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Internships List */}
      {filteredInternships.length > 0 ? (
        <Box sx={{ backgroundColor: '#2D2D2D', borderRadius: 2, p: 2 }}>
          {filteredInternships.map((internship) => (
            <Box 
              key={internship.id}
              sx={{
                p: 2,
                mb: 2,
                border: '1px solid #3D3D3D',
                borderRadius: 1,
                '&:hover': { borderColor: '#C6FF00' }
              }}
            >
              <Typography variant="h6" sx={{ color: '#C6FF00' }}>
                {internship.title} at {internship.company}
              </Typography>
              <Typography sx={{ color: '#B0BEC5', mt: 1 }}>
                {internship.startDate} to {internship.status === 'current' ? 'Present' : internship.endDate}
              </Typography>
              <Typography sx={{ color: '#FFFFFF', mt: 1 }}>
                Status: {internship.status === 'current' ? 'Current Intern' : 'Completed'}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ color: '#B0BEC5' }}>
                  Skills: {internship.skills.join(', ')}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                sx={{
                  color: '#C6FF00',
                  borderColor: '#C6FF00',
                  mt: 2,
                  '&:hover': { borderColor: '#AEEA00' }
                }}
                onClick={() => navigate(`/internship-details/${internship.id}`)}
              >
                View Details
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography sx={{ color: '#B0BEC5', mt: 2 }}>
          No internships found matching your criteria
        </Typography>
      )}
    </Box>
  );
};

const ProStudentDashboard = () => (
  <Box sx={{ mt: 4, p: 3 }}>
    <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
      PRO Student Dashboard
    </Typography>
    <Typography sx={{ color: '#B0BEC5', mt: 2 }}>
      Welcome, PRO Student! Access premium features and internships.
    </Typography>
  </Box>
);

const CompanyDashboard = () => (
  <Box sx={{ mt: 4, p: 3 }}>
    <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
      Company Dashboard
    </Typography>
    <Typography sx={{ color: '#B0BEC5', mt: 2 }}>
      Welcome, Company! Post internships and manage applications.
    </Typography>
  </Box>
);

const FacultyDashboard = () => (
  <Box sx={{ mt: 4, p: 3 }}>
    <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
      Faculty Member Dashboard
    </Typography>
    <Typography sx={{ color: '#B0BEC5', mt: 2 }}>
      Welcome, Faculty Member! Oversee student progress and internships.
    </Typography>
  </Box>
);

// Main App Component
function App() {
  const { applications, setApplications, students, setStudents, reports, setReports, evaluationReports, setEvaluationReports, appointments, setAppointments, internshipCycle, setInternshipCycle } = useMockData();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Header />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/companies" element={<Typography sx={{ color: '#FFFFFF' }}>Companies Page</Typography>} />
              <Route path="/internships" element={<Typography sx={{ color: '#FFFFFF' }}>Internships Page</Typography>} />
              <Route path="/students" element={<Typography sx={{ color: '#FFFFFF' }}>Students Page</Typography>} />
              <Route path="/reports" element={<Typography sx={{ color: '#FFFFFF' }}>Reports Page</Typography>} />
              <Route path="/appointments" element={<Typography sx={{ color: '#FFFFFF' }}>Appointments Page</Typography>} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register-company" element={<RegisterCompany setApplications={setApplications} />} />

              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/pro-student-dashboard" element={<ProStudentDashboard />} />
              <Route path="/company-dashboard" element={<CompanyDashboard />} />
              <Route path="/scad-dashboard" element={<ScadDashboard applications={applications} setApplications={setApplications} students={students} reports={reports} evaluationReports={evaluationReports} appointments={appointments} setAppointments={setAppointments} internshipCycle={internshipCycle} setInternshipCycle={setInternshipCycle} />} />
              <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
              <Route path="/statistics" element={<StatisticsPage reports={reports} students={students} evaluationReports={evaluationReports} internshipCycle={internshipCycle} />} />
              <Route path="/video-call/:id" element={<VideoCallPage appointments={appointments} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;