'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Divider, 
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tab,
  Tabs,
  IconButton,
  TextField,
  CircularProgress
} from '@mui/material';
import { 
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
  Share as ShareIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import Link from 'next/link';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`challenge-detail-tabpanel-${index}`}
      aria-labelledby={`challenge-detail-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `challenge-detail-tab-${index}`,
    'aria-controls': `challenge-detail-tabpanel-${index}`,
  };
}

// Mock challenge data
const mockChallengeData = {
  '1': {
    id: '1',
    title: '30 Days of Meditation',
    description: 'Meditate for at least 10 minutes every day for 30 days to build a consistent mindfulness practice.',
    category: 'Mindfulness',
    progress: 60,
    daysLeft: 12,
    totalDays: 30,
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    rules: 'Meditate for at least 10 minutes each day. Record your session in the app. You can use any meditation technique that works for you.',
    creator: {
      id: 'user1',
      name: 'John Doe',
      avatar: '/images/avatar1.jpg'
    },
    participants: 24,
    isJoined: true,
    checkIns: [
      { date: '2024-02-25', completed: true, notes: 'Used guided meditation, felt very relaxed after.' },
      { date: '2024-02-24', completed: true, notes: 'Morning meditation, 15 minutes.' },
      { date: '2024-02-23', completed: true, notes: 'Evening session, focused on breathing.' },
      { date: '2024-02-22', completed: false, notes: '' },
      { date: '2024-02-21', completed: true, notes: 'Tried a new technique today.' },
    ],
    leaderboard: [
      { userId: 'user2', name: 'Alice Smith', avatar: '/images/avatar2.jpg', progress: 85, streak: 12 },
      { userId: 'user3', name: 'Bob Johnson', avatar: '/images/avatar3.jpg', progress: 70, streak: 8 },
      { userId: 'user1', name: 'John Doe', avatar: '/images/avatar1.jpg', progress: 60, streak: 6 },
      { userId: 'user4', name: 'Emma Wilson', avatar: '/images/avatar4.jpg', progress: 55, streak: 5 },
    ]
  },
  '2': {
    id: '2',
    title: 'Read 12 Books in 2024',
    description: 'Read one book per month throughout the year to expand knowledge and improve focus.',
    category: 'Learning',
    progress: 25,
    daysLeft: 275,
    totalDays: 365,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rules: 'Read at least one book each month. Books must be at least 200 pages long. Audiobooks count too!',
    creator: {
      id: 'user3',
      name: 'Bob Johnson',
      avatar: '/images/avatar3.jpg'
    },
    participants: 56,
    isJoined: true,
    checkIns: [
      { date: '2024-02-15', completed: true, notes: 'Finished "Atomic Habits" by James Clear' },
      { date: '2024-01-20', completed: true, notes: 'Finished "The Psychology of Money" by Morgan Housel' },
    ],
    leaderboard: [
      { userId: 'user5', name: 'Sarah Parker', avatar: '/images/avatar5.jpg', progress: 33, streak: 0 },
      { userId: 'user1', name: 'John Doe', avatar: '/images/avatar1.jpg', progress: 25, streak: 0 },
      { userId: 'user6', name: 'Michael Brown', avatar: '/images/avatar6.jpg', progress: 16, streak: 0 },
    ]
  },
  '3': {
    id: '3',
    title: 'Learn a New Language',
    description: 'Reach conversational level in a new language by practicing consistently.',
    category: 'Learning',
    progress: 35,
    daysLeft: 180,
    totalDays: 365,
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    rules: 'Practice for at least 15 minutes every day using any language learning app or method. Weekly conversation practice is recommended.',
    creator: {
      id: 'user1',
      name: 'John Doe',
      avatar: '/images/avatar1.jpg'
    },
    participants: 42,
    isJoined: true,
    checkIns: [
      { date: '2024-02-26', completed: true, notes: 'Learned 20 new words' },
      { date: '2024-02-25', completed: true, notes: 'Practiced conversation with language partner' },
      { date: '2024-02-24', completed: true, notes: 'Completed 2 grammar lessons' },
      { date: '2024-02-23', completed: true, notes: 'Watched a short video in target language' },
      { date: '2024-02-22', completed: true, notes: 'Reviewed flashcards' },
    ],
    leaderboard: [
      { userId: 'user7', name: 'David Lee', avatar: '/images/avatar7.jpg', progress: 52, streak: 26 },
      { userId: 'user8', name: 'Jennifer Kim', avatar: '/images/avatar8.jpg', progress: 48, streak: 15 },
      { userId: 'user1', name: 'John Doe', avatar: '/images/avatar1.jpg', progress: 35, streak: 5 },
    ]
  }
};

interface ChallengeDetailContentProps {
  challengeId: string;
}

export function ChallengeDetailContent({ challengeId }: ChallengeDetailContentProps) {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [checkInNote, setCheckInNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch challenge data
    const fetchChallenge = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const challengeData = mockChallengeData[challengeId as keyof typeof mockChallengeData];
        
        if (challengeData) {
          setChallenge(challengeData as Challenge);
        } else {
          // Handle challenge not found
          console.error('Challenge not found');
        }
      } catch (error) {
        console.error('Error fetching challenge:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallenge();
  }, [challengeId]);
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleCheckInSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would update the backend
      console.log('Check-in submitted:', { challengeId, note: checkInNote });
      
      // Clear the form
      setCheckInNote('');
      
      // Refresh challenge data (in a real app)
      // This is a mock update for demonstration
      if (challenge) {
        const today = new Date().toISOString().split('T')[0];
        const updatedCheckIns = [
          { date: today, completed: true, notes: checkInNote },
          ...challenge.checkIns
        ];
        
        setChallenge({
          ...challenge,
          checkIns: updatedCheckIns,
          progress: Math.min(challenge.progress + (100 / challenge.totalDays), 100)
        });
      }
    } catch (error) {
      console.error('Error submitting check-in:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!challenge) {
    return (
      <Box>
        <Typography variant="h5" color="error">
          Challenge not found
        </Typography>
        <Button 
          component={Link} 
          href="/challenges" 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Challenges
        </Button>
      </Box>
    );
  }
  
  const today = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = challenge.checkIns.some((checkIn: any) => 
    checkIn.date === today && checkIn.completed
  );

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button 
          component={Link} 
          href="/challenges" 
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Challenges
        </Button>
      </Box>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {challenge.title}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={challenge.category} color="primary" size="small" />
              <Chip 
                icon={<GroupIcon />} 
                label={`${challenge.participants} participants`} 
                size="small" 
                variant="outlined" 
              />
            </Box>
            
            <Typography variant="body1" paragraph>
              {challenge.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {challenge.daysLeft} days left
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Your Progress: {challenge.progress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({Math.round(challenge.progress * challenge.totalDays / 100)}/{challenge.totalDays} days)
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={challenge.progress} 
              sx={{ height: 8, borderRadius: 4, mb: 3 }} 
            />
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Card variant="outlined" sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Created by
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={challenge.creator.avatar} 
                    alt={challenge.creator.name}
                    sx={{ mr: 1 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/40?text=User';
                    }}
                  />
                  <Typography variant="body2">
                    {challenge.creator.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            <Box sx={{ width: '100%', display: 'flex', gap: 2, mb: 2 }}>
              {challenge.isJoined ? (
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  disabled={hasCheckedInToday}
                  onClick={() => setTabValue(1)} // Switch to Check-in tab
                >
                  {hasCheckedInToday ? 'Checked In Today' : 'Check In Today'}
                </Button>
              ) : (
                <Button variant="contained" color="primary" fullWidth>
                  Join Challenge
                </Button>
              )}
              
              <IconButton color="primary" aria-label="share challenge">
                <ShareIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="challenge details tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Check-ins" {...a11yProps(1)} />
            <Tab label="Leaderboard" {...a11yProps(2)} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Challenge Rules
          </Typography>
          <Typography variant="body1" paragraph>
            {challenge.rules}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Tips for Success
          </Typography>
          <Typography variant="body1">
            <ul>
              <li>Set a specific time each day for this challenge</li>
              <li>Track your progress consistently</li>
              <li>Join the community discussions for motivation</li>
              <li>Don't break the chain - consistency is key!</li>
            </ul>
          </Typography>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {challenge.isJoined && !hasCheckedInToday && (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Daily Check-in
                </Typography>
                <Box component="form" onSubmit={handleCheckInSubmit}>
                  <TextField
                    label="How did it go today? (optional)"
                    multiline
                    rows={2}
                    fullWidth
                    value={checkInNote}
                    onChange={(e) => setCheckInNote(e.target.value)}
                    sx={{ mb: 2 }}
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : <CheckCircleIcon />}
                  >
                    {isSubmitting ? 'Submitting...' : 'Complete Today\'s Check-in'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
          
          <Typography variant="h6" gutterBottom>
            Your Check-in History
          </Typography>
          
          <List>
            {challenge.checkIns.map((checkIn: any, index: number) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: checkIn.completed ? 'success.main' : 'error.main' }}>
                      {checkIn.completed ? <CheckCircleIcon /> : <TimeIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1">
                          {new Date(checkIn.date).toLocaleDateString(undefined, { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </Typography>
                        <Chip 
                          label={checkIn.completed ? 'Completed' : 'Missed'} 
                          color={checkIn.completed ? 'success' : 'error'} 
                          size="small" 
                        />
                      </Box>
                    }
                    secondary={
                      checkIn.notes ? (
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {checkIn.notes}
                        </Typography>
                      ) : (
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          fontStyle="italic"
                        >
                          No notes for this day
                        </Typography>
                      )
                    }
                  />
                </ListItem>
                {index < challenge.checkIns.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Leaderboard
          </Typography>
          
          <List>
            {challenge.leaderboard.map((user: any, index: number) => (
              <React.Fragment key={user.userId}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar 
                      src={user.avatar} 
                      alt={user.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/40?text=User';
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ mr: 1 }}>
                          {index + 1}. {user.name}
                        </Typography>
                        {index === 0 && (
                          <Chip label="Leader" color="primary" size="small" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" component="span">
                          Progress: {user.progress}%
                        </Typography>
                        {user.streak > 0 && (
                          <Typography variant="body2" component="span" sx={{ ml: 2 }}>
                            🔥 {user.streak} day streak
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress
                      variant="determinate"
                      value={user.progress}
                      size={40}
                      thickness={4}
                      sx={{ color: index === 0 ? 'primary.main' : 'secondary.main' }}
                    />
                  </Box>
                </ListItem>
                {index < challenge.leaderboard.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
      </Box>
    </Box>
  );
} 