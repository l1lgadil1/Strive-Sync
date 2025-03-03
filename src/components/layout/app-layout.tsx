'use client';

import { ReactNode, useState, useEffect } from 'react';
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useAppStore } from '@/lib/store/use-app-store';
import { Sidebar } from '@/components/layout/sidebar';

interface IAppLayoutProps {
  children: ReactNode;
}

const DRAWER_WIDTH = 240;

export function AppLayout({ children }: IAppLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Use local state for initial render to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  // Get the global state from Zustand
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  
  // After hydration, sync the local state with the global state
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Only use the sidebar state if we're mounted
  const effectiveSidebarOpen = mounted ? sidebarOpen : false;
  
  const handleDrawerToggle = () => {
    if (mounted) {
      setSidebarOpen(!effectiveSidebarOpen);
    }
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <Box sx={{ display: 'flex', minHeight: '100vh' }} />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: effectiveSidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
          ml: { md: effectiveSidebarOpen ? `${DRAWER_WIDTH}px` : 0 },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            StriveSync
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={effectiveSidebarOpen}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', height: '100%' }}>
          <Sidebar />
        </Box>
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${effectiveSidebarOpen ? DRAWER_WIDTH : 0}px)` },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar /> {/* This is for spacing below the AppBar */}
        {children}
      </Box>
    </Box>
  );
} 