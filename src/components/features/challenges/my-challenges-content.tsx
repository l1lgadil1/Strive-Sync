'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
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
      id={`my-challenges-tabpanel-${index}`}
      aria-labelledby={`my-challenges-tab-${index}`}
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
    id: `my-challenges-tab-${index}`,
    'aria-controls': `my-challenges-tabpanel-${index}`,
  };
}

// Mock data for challenges
const activeChallenges = [
  {
    id: '1',
    title: '30 Days of Meditation',
    description: 'Meditate for at least 10 minutes every day for 30 days.',
    category: 'Mindfulness',
    progress: 60,
    daysLeft: 12,
    image: '/images/meditation.jpg',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
  },
  {
    id: '2',
    title: 'Read 12 Books in 2024',
    description: 'Read one book per month throughout the year.',
    category: 'Learning',
    progress: 25,
    daysLeft: 275,
    image: '/images/reading.jpg',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: '3',
    title: 'Learn a New Language',
    description: 'Reach conversational level in a new language.',
    category: 'Learning',
    progress: 35,
    daysLeft: 180,
    image: '/images/language.jpg',
    startDate: '2024-01-15',
    endDate: '2024-07-15',
  },
];

const completedChallenges = [
  {
    id: '4',
    title: '10K Steps Daily',
    description: 'Walk at least 10,000 steps every day for a month.',
    category: 'Fitness',
    completedDate: '2023-12-15',
    image: '/images/walking.jpg',
  },
  {
    id: '5',
    title: 'Digital Detox Weekend',
    description: 'Spend a weekend without digital devices.',
    category: 'Wellbeing',
    completedDate: '2023-11-20',
    image: '/images/digital-detox.jpg',
  },
];

export function MyChallengesContent() {
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, challengeId: string) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedChallengeId(challengeId);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedChallengeId(null);
  };
  
  const handleLeaveChallenge = () => {
    // Logic to leave the challenge
    console.log(`Leaving challenge ${selectedChallengeId}`);
    handleMenuClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Challenges
        </Typography>
        <Link href="/challenges/create" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Create New Challenge
          </Button>
        </Link>
      </Box>
      
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="my challenges tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              label={
                <Badge badgeContent={activeChallenges.length} color="primary">
                  Active
                </Badge>
              } 
              {...a11yProps(0)} 
            />
            <Tab 
              label={
                <Badge badgeContent={completedChallenges.length} color="success">
                  Completed
                </Badge>
              } 
              {...a11yProps(1)} 
            />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {activeChallenges.map((challenge) => (
              <Grid item xs={12} sm={6} md={4} key={challenge.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={challenge.image}
                    alt={challenge.title}
                    sx={{ objectFit: 'cover' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/300x140?text=Challenge';
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {challenge.title}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMenuOpen(e, challenge.id)}
                        aria-label="challenge options"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    <Chip 
                      label={challenge.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                      sx={{ mb: 1 }} 
                    />
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {challenge.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Progress</Typography>
                        <Typography variant="body2">{challenge.progress}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={challenge.progress} 
                        sx={{ height: 8, borderRadius: 4 }} 
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {challenge.daysLeft} days left
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Link href={`/challenges/${challenge.id}`} style={{ textDecoration: 'none', width: '100%' }}>
                      <Button size="small" fullWidth>View Details</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {completedChallenges.map((challenge) => (
              <Grid item xs={12} sm={6} md={4} key={challenge.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={challenge.image}
                    alt={challenge.title}
                    sx={{ objectFit: 'cover' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/300x140?text=Challenge';
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {challenge.title}
                      </Typography>
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Completed" 
                        color="success" 
                        size="small" 
                      />
                    </Box>
                    <Chip 
                      label={challenge.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                      sx={{ mb: 1 }} 
                    />
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {challenge.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        Completed on {new Date(challenge.completedDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Link href={`/challenges/${challenge.id}`} style={{ textDecoration: 'none', width: '100%' }}>
                      <Button size="small" fullWidth>View Details</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Box>
      
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLeaveChallenge}>
          <CancelIcon fontSize="small" sx={{ mr: 1 }} />
          Leave Challenge
        </MenuItem>
      </Menu>
    </Box>
  );
} 