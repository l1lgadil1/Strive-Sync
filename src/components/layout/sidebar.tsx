'use client';

import { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Collapse } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExploreIcon from '@mui/icons-material/Explore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface INavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  children?: INavItem[];
}

const navItems: INavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Challenges',
    path: '/challenges',
    icon: <FitnessCenterIcon />,
    children: [
      {
        title: 'Browse',
        path: '/challenges',
        icon: <ExploreIcon />,
      },
      {
        title: 'My Challenges',
        path: '/challenges/my',
        icon: <AssignmentIcon />,
      },
      {
        title: 'Create',
        path: '/challenges/create',
        icon: <AddCircleOutlineIcon />,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubMenuToggle = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  const renderNavItems = (items: INavItem[], level = 0) => {
    return items.map((item) => {
      const isActive = pathname === item.path;
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openSubMenu === item.title;

      return (
        <Box key={item.path}>
          {hasChildren ? (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleSubMenuToggle(item.title)}
                  sx={{
                    pl: level * 2 + 2,
                    bgcolor: isActive ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children && renderNavItems(item.children, level + 1)}
                </List>
              </Collapse>
            </>
          ) : (
            <ListItem disablePadding>
              <Link href={item.path} style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}>
                <ListItemButton
                  sx={{
                    pl: level * 2 + 2,
                    bgcolor: isActive ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          )}
        </Box>
      );
    });
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main navigation">
        {renderNavItems(navItems)}
      </List>
      <Divider />
    </Box>
  );
} 