import { LoginForm } from '@/components/features/auth/login-form';
import { Box, Container, Typography, Paper } from '@mui/material';

export const metadata = {
  title: 'Login - StriveSync',
  description: 'Login to your StriveSync account',
};

export default function LoginPage() {
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
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Log in to continue your self-improvement journey
          </Typography>
          
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
} 