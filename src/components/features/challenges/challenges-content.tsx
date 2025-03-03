'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Chip,
  CardActions,
  Avatar,
  IconButton,
  InputAdornment,
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PeopleIcon from '@mui/icons-material/People';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock data for challenges
const challenges = [
  {
    id: '1',
    title: 'Morning Workout Challenge',
    description: 'Start your day with a 30-minute workout routine for 30 days.',
    category: 'fitness',
    participants: 245,
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    isFavorite: false,
    createdBy: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  },
  {
    id: '2',
    title: 'Daily Reading Habit',
    description: 'Read at least 20 pages every day for a month.',
    category: 'learning',
    participants: 189,
    imageUrl: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    isFavorite: true,
    createdBy: {
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  },
  {
    id: '3',
    title: 'Meditation for Mindfulness',
    description: 'Practice meditation for 10 minutes daily to improve focus and reduce stress.',
    category: 'mindfulness',
    participants: 312,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    isFavorite: false,
    createdBy: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  },
  {
    id: '4',
    title: 'Productivity Boost',
    description: 'Implement the Pomodoro technique for 25 days to enhance productivity.',
    category: 'productivity',
    participants: 178,
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
    isFavorite: false,
    createdBy: {
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    }
  },
  {
    id: '5',
    title: 'Financial Tracking',
    description: 'Track all expenses for 30 days to build better financial habits.',
    category: 'finance',
    participants: 156,
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    isFavorite: false,
    createdBy: {
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/91.jpg'
    }
  },
  {
    id: '6',
    title: 'Social Media Detox',
    description: 'Limit social media usage to 30 minutes per day for 21 days.',
    category: 'social',
    participants: 201,
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    isFavorite: true,
    createdBy: {
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'fitness':
      return '#e53935'; // red
    case 'learning':
      return '#1e88e5'; // blue
    case 'mindfulness':
      return '#43a047'; // green
    case 'productivity':
      return '#fb8c00'; // orange
    case 'finance':
      return '#6d4c41'; // brown
    case 'social':
      return '#8e24aa'; // purple
    default:
      return '#757575'; // grey
  }
};

export function ChallengesContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    challenges.reduce((acc, challenge) => ({
      ...acc,
      [challenge.id]: challenge.isFavorite,
    }), {})
  );
  
  const handleFavoriteToggle = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || challenge.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Box sx={{ py: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Challenges
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            component={Link}
            href="/challenges/create"
          >
            Create Challenge
          </Button>
        </Box>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="fitness">Fitness</MenuItem>
                <MenuItem value="learning">Learning</MenuItem>
                <MenuItem value="mindfulness">Mindfulness</MenuItem>
                <MenuItem value="productivity">Productivity</MenuItem>
                <MenuItem value="finance">Finance</MenuItem>
                <MenuItem value="social">Social</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </motion.div>
      
      <Grid container spacing={3}>
        {filteredChallenges.map((challenge, index) => (
          <Grid item xs={12} sm={6} md={4} key={challenge.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={challenge.imageUrl}
                  alt={challenge.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Chip 
                      label={challenge.category} 
                      size="small" 
                      sx={{ 
                        bgcolor: getCategoryColor(challenge.category),
                        color: 'white',
                        fontWeight: 'bold',
                      }} 
                    />
                    <IconButton 
                      size="small" 
                      onClick={() => handleFavoriteToggle(challenge.id)}
                      sx={{ color: favorites[challenge.id] ? 'error.main' : 'action.disabled' }}
                    >
                      {favorites[challenge.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {challenge.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {challenge.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                    <Avatar 
                      src={challenge.createdBy.avatar} 
                      alt={challenge.createdBy.name}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {challenge.createdBy.name}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PeopleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {challenge.participants}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    fullWidth 
                    variant="contained"
                    component={Link}
                    href={`/challenges/${challenge.id}`}
                  >
                    View Challenge
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      
      {filteredChallenges.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No challenges found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters, or create a new challenge.
          </Typography>
        </Box>
      )}
      
      {filteredChallenges.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={3} color="primary" />
        </Box>
      )}
    </Box>
  );
} 