  import { RegisterForm } from '@/components/features/auth/register-form';
import { Box, Container, Typography, Paper } from '@mui/material';

export const metadata = {
  title: 'Register - StriveSync',
  description: 'Create your StriveSync account',
};

export default function RegisterPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Join StriveSync
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Create an account to start your self-improvement journey
          </Typography>
          
          <RegisterForm />
        </Paper>
      </Box>
    </Container>
  );
} 