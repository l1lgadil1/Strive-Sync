'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '@/lib/store/use-app-store';

// Form validation schema
const createChallengeSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(500, 'Description must be less than 500 characters'),
  category: z.string().min(1, 'Please select a category'),
  startDate: z.date().refine(date => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: 'Start date must be today or in the future',
  }),
  endDate: z.date(),
  isPublic: z.boolean(),
  hasReminders: z.boolean(),
  reminderFrequency: z.string().optional(),
  rules: z.string().min(10, 'Rules must be at least 10 characters').max(1000, 'Rules must be less than 1000 characters'),
}).refine(data => data.endDate > data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

type CreateChallengeFormValues = z.infer<typeof createChallengeSchema>;

const categories = [
  'Fitness',
  'Mindfulness',
  'Learning',
  'Productivity',
  'Nutrition',
  'Creativity',
  'Finance',
  'Social',
  'Wellbeing',
  'Other'
];

const reminderOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'custom', label: 'Custom' }
];

const steps = ['Basic Information', 'Challenge Details', 'Review'];

export function CreateChallengeContent() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm<CreateChallengeFormValues>({
    resolver: zodResolver(createChallengeSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      category: '',
      startDate: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      isPublic: true,
      hasReminders: true,
      reminderFrequency: 'daily',
      rules: '',
    },
  });
  
  const watchHasReminders = watch('hasReminders');
  const watchAllFields = watch();
  
  const handleNext = async () => {
    const fieldsToValidate = activeStep === 0 
      ? ['title', 'description', 'category'] 
      : activeStep === 1 
        ? ['startDate', 'endDate', 'rules'] 
        : [];
    
    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const onSubmit = async (data: CreateChallengeFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Challenge created:', data);
      
      // Redirect to the new challenge page (in a real app, you'd redirect to the newly created challenge)
      router.push('/challenges/my');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to create challenge. Please try again.';
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create a New Challenge
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Set up a new self-improvement challenge to track your progress and achieve your goals.
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Challenge Title"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.category}>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        {...field}
                        labelId="category-label"
                        label="Category"
                        disabled={isSubmitting}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.category && (
                        <FormHelperText>{errors.category.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="isPublic"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          disabled={isSubmitting}
                        />
                      }
                      label="Make this challenge public (others can join)"
                    />
                  )}
                />
              </Grid>
            </Grid>
          )}
          
          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Challenge Details
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Start Date"
                        value={field.value}
                        onChange={(date: Date | null) => {
                          field.onChange(date);
                          trigger('startDate');
                          if (date) trigger('endDate');
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            error: !!errors.startDate,
                            helperText: errors.startDate?.message,
                          },
                        }}
                        disabled={isSubmitting}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="End Date"
                        value={field.value}
                        onChange={(date: Date | null) => {
                          field.onChange(date);
                          trigger('endDate');
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            error: !!errors.endDate,
                            helperText: errors.endDate?.message,
                          },
                        }}
                        disabled={isSubmitting}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="rules"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Challenge Rules"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Describe the rules and requirements for completing this challenge"
                      error={!!errors.rules}
                      helperText={errors.rules?.message}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="hasReminders"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          disabled={isSubmitting}
                        />
                      }
                      label="Enable reminders for this challenge"
                    />
                  )}
                />
              </Grid>
              
              {watchHasReminders && (
                <Grid item xs={12}>
                  <Controller
                    name="reminderFrequency"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="reminder-frequency-label">Reminder Frequency</InputLabel>
                        <Select
                          {...field}
                          labelId="reminder-frequency-label"
                          label="Reminder Frequency"
                          disabled={isSubmitting}
                        >
                          {reminderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              )}
            </Grid>
          )}
          
          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Review Your Challenge
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {watchAllFields.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip label={watchAllFields.category} color="primary" size="small" />
                      <Chip 
                        label={watchAllFields.isPublic ? 'Public' : 'Private'} 
                        color={watchAllFields.isPublic ? 'success' : 'default'} 
                        size="small" 
                      />
                    </Box>
                    
                    <Typography variant="body1" paragraph>
                      {watchAllFields.description}
                    </Typography>
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Duration
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {watchAllFields.startDate.toLocaleDateString()} to {watchAllFields.endDate.toLocaleDateString()}
                      {' '}
                      ({Math.ceil((watchAllFields.endDate.getTime() - watchAllFields.startDate.getTime()) / (1000 * 60 * 60 * 24))} days)
                    </Typography>
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Rules
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {watchAllFields.rules}
                    </Typography>
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Reminders
                    </Typography>
                    <Typography variant="body2">
                      {watchAllFields.hasReminders 
                        ? `Enabled (${reminderOptions.find(o => o.value === watchAllFields.reminderFrequency)?.label})` 
                        : 'Disabled'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
            </Grid>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0 || isSubmitting}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? 'Creating...' : 'Create Challenge'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
} 