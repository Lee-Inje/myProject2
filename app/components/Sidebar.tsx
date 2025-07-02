'use client';

import { useState } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton, 
  Box, 
  Typography, 
  IconButton,
  Collapse,
  ListItemIcon
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExpandLess, 
  ExpandMore,
  Dashboard,
  Assessment,
  People,
  Settings
} from '@mui/icons-material';
import { useLayoutStore } from '../store/layoutStore';
import { useRouter } from 'next/navigation';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

export default function Sidebar() {
  const { topMenu, subMenu, menuData, setSubMenu, sidebarOpen, setSidebarOpen } = useLayoutStore();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const currentTopMenu = menuData.find(item => item.menucode === topMenu);
  const subMenus = currentTopMenu?.subMenu || [];

  const handleSubMenuClick = (menuCode: string) => {
    setSubMenu(menuCode);
    router.push(`/${topMenu}/${menuCode}`);
  };

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleExpandClick = (itemKey: string) => {
    setExpandedItems(prev => 
      prev.includes(itemKey) 
        ? prev.filter(key => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  const getMenuIcon = (menuCode: string) => {
    switch (menuCode) {
      case 'A1_1':
        return <Dashboard />;
      case 'A1_2':
        return <Assessment />;
      case 'A2_1':
        return <People />;
      case 'A2_2':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Drawer 
      variant="permanent" 
      anchor="left"
      sx={{
        width: sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      {/* 헤더 영역 */}
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 64
      }}>
        {sidebarOpen && (
          <Typography variant="h6" color="primary" noWrap>
            {currentTopMenu?.menuName || '메뉴'}
          </Typography>
        )}
        <IconButton onClick={handleDrawerToggle} size="small">
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      {/* 메뉴 리스트 */}
      <List sx={{ pt: 1 }}>
        {subMenus.map((item) => (
          <Box key={item.menucode}>
            <ListItem disablePadding>
              <ListItemButton
                selected={subMenu === item.menucode}
                onClick={() => handleSubMenuClick(item.menucode)}
                sx={{
                  minHeight: 48,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    color: subMenu === item.menucode ? 'inherit' : undefined,
                  }}
                >
                  {getMenuIcon(item.menucode)}
                </ListItemIcon>
                {sidebarOpen && (
                  <ListItemText 
                    primary={item.menuName}
                    primaryTypographyProps={{
                      fontWeight: subMenu === item.menucode ? 'bold' : 'normal',
                      fontSize: '0.875rem',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
