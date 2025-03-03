'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Button,
  Chip,
  LinearProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SpaIcon from '@mui/icons-material/Spa';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Define the Challenge type to fix TypeScript errors
interface Challenge {
  id: string;
  title: string;
  category: string;
  progress: number;
  daysLeft: number;
  participants: number;
  streakDays: number;
  lastCheckIn: string | null;
}

const stats = [
  { label: 'Completed Challenges', value: 8 },
  { label: 'Current Streak', value: 15 },
  { label: 'Total Points', value: 1250 },
  { label: 'Achievements', value: 12 },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'fitness':
      return <FitnessCenterIcon />;
    case 'learning':
      return <MenuBookIcon />;
    case 'mindfulness':
      return <SpaIcon />;
    default:
      return <WorkIcon />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'fitness':
      return '#e53935'; // red
    case 'learning':
      return '#1e88e5'; // blue
    case 'mindfulness':
      return '#43a047'; // green
    default:
      return '#fb8c00'; // orange
  }
};

// Mock data for the dashboard
const activeChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Morning Workout Challenge',
    category: 'fitness',
    progress: 65,
    daysLeft: 12,
    participants: 245,
    streakDays: 7,
    lastCheckIn: null,
  },
  {
    id: '2',
    title: 'Daily Reading Habit',
    category: 'learning',
    progress: 80,
    daysLeft: 5,
    participants: 189,
    streakDays: 15,
    lastCheckIn: null,
  },
  {
    id: '3',
    title: 'Meditation for Mindfulness',
    category: 'mindfulness',
    progress: 40,
    daysLeft: 20,
    participants: 312,
    streakDays: 3,
    lastCheckIn: null,
  },
];

export function DashboardContent() {
  const theme = useTheme();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>(activeChallenges);
  const [checkInDialogOpen, setCheckInDialogOpen] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [confetti, setConfetti] = useState(false);
  
  // Set isMounted to true when component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Handle view details button click
  const handleViewDetails = (challengeId: string) => {
    router.push(`/challenges/${challengeId}`);
  };
  
  // Handle check in button click
  const handleCheckIn = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      // Check if already checked in today
      const today = new Date().toDateString();
      if (challenge.lastCheckIn === today) {
        setSnackbar({
          open: true,
          message: 'You have already checked in today for this challenge!',
          severity: 'info',
        });
        return;
      }
      
      setCurrentChallenge(challenge);
      setCheckInDialogOpen(true);
    }
  };
  
  // Handle check in confirmation
  const handleCheckInConfirm = () => {
    if (!currentChallenge) return;
    
    setCheckInLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Update challenge data
      setChallenges(prev => 
        prev.map(challenge => 
          challenge.id === currentChallenge.id 
            ? { 
                ...challenge, 
                progress: Math.min(100, challenge.progress + 5),
                streakDays: challenge.streakDays + 1,
                lastCheckIn: new Date().toDateString()
              } 
            : challenge
        )
      );
      
      setCheckInLoading(false);
      setCheckInDialogOpen(false);
      
      // Show success message
      setSnackbar({
        open: true,
        message: `Successfully checked in for ${currentChallenge.title}! Streak: ${currentChallenge.streakDays + 1} days`,
        severity: 'success',
      });
      
      // Trigger confetti effect for streaks divisible by 5
      if ((currentChallenge.streakDays + 1) % 5 === 0) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
      }
    }, 1500);
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    if (!checkInLoading) {
      setCheckInDialogOpen(false);
    }
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };
  
  // Handle browse challenges button click
  const handleBrowseChallenges = () => {
    router.push('/challenges');
  };
  
  // Check if user can check in (not already checked in today)
  const canCheckIn = (challenge: Challenge) => {
    const today = new Date().toDateString();
    return challenge.lastCheckIn !== today;
  };
  
  // If not mounted yet, render a simple placeholder to avoid hydration mismatch
  if (!isMounted) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Welcome back, Alex!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Here's your progress overview for today.
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Static placeholder content */}
        </Grid>
      </Box>
    );
  }
  
  return (
    <Box sx={{ py: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Welcome back, Alex!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Here's your progress overview for today.
        </Typography>
      </motion.div>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}

        {/* Active Challenges */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
              Active Challenges
            </Typography>
          </motion.div>
          
          <Grid container spacing={3}>
            {challenges.map((challenge, index) => (
              <Grid item xs={12} md={4} key={challenge.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Card sx={{ height: '100%', position: 'relative' }}>
                    {challenge.lastCheckIn === new Date().toDateString() && (
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          top: 12, 
                          right: 12, 
                          zIndex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: 'success.light',
                          color: 'white',
                          borderRadius: '12px',
                          px: 1,
                          py: 0.5,
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        Checked In Today
                      </Box>
                    )}
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: getCategoryColor(challenge.category) }}>
                          {getCategoryIcon(challenge.category)}
                        </Avatar>
                      }
                      title={challenge.title}
                      subheader={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {challenge.daysLeft} days left
                          </Typography>
                          <Tooltip title={`${challenge.streakDays} day streak`}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <EmojiEventsIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                              <Typography variant="body2" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                                {challenge.streakDays}
                              </Typography>
                            </Box>
                          </Tooltip>
                        </Box>
                      }
                      action={
                        <Chip 
                          label={`${challenge.participants} participants`} 
                          size="small" 
                          sx={{ mt: 1 }}
                        />
                      }
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          Progress:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {challenge.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={challenge.progress} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: 'rgba(0,0,0,0.05)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getCategoryColor(challenge.category),
                          }
                        }}
                      />
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button 
                          size="small" 
                          onClick={() => handleViewDetails(challenge.id)}
                        >
                          View Details
                        </Button>
                        <Tooltip title={
                          !canCheckIn(challenge) 
                            ? "You've already checked in today" 
                            : "Record your progress for today"
                        }>
                          <span>
                            <Button 
                              size="small" 
                              variant="contained" 
                              sx={{ 
                                bgcolor: canCheckIn(challenge) 
                                  ? getCategoryColor(challenge.category) 
                                  : 'grey.400',
                                '&:hover': {
                                  bgcolor: canCheckIn(challenge) 
                                    ? getCategoryColor(challenge.category) + 'DD'
                                    : 'grey.500'
                                }
                              }}
                              onClick={() => handleCheckIn(challenge.id)}
                              disabled={!canCheckIn(challenge)}
                            >
                              {canCheckIn(challenge) ? 'Check In' : 'Checked In'}
                            </Button>
                          </span>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Suggested Challenges */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
              Suggested Challenges
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  Discover new challenges tailored to your interests and goals.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }}
                  onClick={handleBrowseChallenges}
                >
                  Browse Challenges
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
      
      {/* Check-in Dialog */}
      <Dialog 
        open={checkInDialogOpen} 
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          Check In for Challenge
        </DialogTitle>
        <DialogContent>
          {currentChallenge && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: getCategoryColor(currentChallenge.category),
                    mr: 2
                  }}
                >
                  {getCategoryIcon(currentChallenge.category)}
                </Avatar>
                <Typography variant="h6">
                  {currentChallenge.title}
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                Recording your progress for today will:
              </Typography>
              
              <Box sx={{ pl: 2, mb: 3 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  • Increase your progress by 5%
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  • Extend your streak to {currentChallenge.streakDays + 1} days
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  • Earn you points toward achievements
                </Typography>
              </Box>
              
              {(currentChallenge.streakDays + 1) % 5 === 0 && (
                <Box sx={{ 
                  bgcolor: 'warning.light', 
                  p: 2, 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2
                }}>
                  <EmojiEventsIcon sx={{ color: 'warning.dark', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: 'warning.dark', fontWeight: 'bold' }}>
                    Milestone alert! You'll reach a {currentChallenge.streakDays + 1}-day streak!
                  </Typography>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleDialogClose} 
            disabled={checkInLoading}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCheckInConfirm}
            disabled={checkInLoading}
            startIcon={checkInLoading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ 
              bgcolor: currentChallenge ? getCategoryColor(currentChallenge.category) : 'primary.main',
              '&:hover': {
                bgcolor: currentChallenge ? getCategoryColor(currentChallenge.category) + 'DD' : 'primary.dark'
              }
            }}
          >
            {checkInLoading ? 'Recording...' : 'Confirm Check-In'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      
      {/* Confetti Effect */}
      {confetti && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          <AnimatePresence>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -20, 
                  x: Math.random() * window.innerWidth,
                  rotate: 0,
                  opacity: 1
                }}
                animate={{ 
                  y: window.innerHeight + 100,
                  rotate: Math.random() * 360,
                  opacity: 0
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2 + Math.random() * 3,
                  ease: "easeOut"
                }}
                style={{
                  position: 'absolute',
                  width: 10 + Math.random() * 20,
                  height: 10 + Math.random() * 20,
                  backgroundColor: [
                    '#FFD700', // gold
                    '#FF6347', // tomato
                    '#4169E1', // royal blue
                    '#32CD32', // lime green
                    '#FF69B4', // hot pink
                    '#1E90FF', // dodger blue
                    '#FF8C00', // dark orange
                    '#8A2BE2', // blue violet
                  ][Math.floor(Math.random() * 8)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                }}
              />
            ))}
          </AnimatePresence>
        </Box>
      )}
    </Box>
  );
} 