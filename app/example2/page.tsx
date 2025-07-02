
'use client'

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Paper,
  Stack,
  Grid,
} from '@mui/material';
import QstListDetail from '../example/components/QstListDetail';
import MuiFormExample from './components/formTag';
import TabView from '../example3/components/TabView';
import QstList from './components/QstList';

export default function Example2() {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  
  const renderMainContent = () => {
    switch (selectedMenu) {
      case 'menu1':
        return (
            <QstListDetail />
        );
        case 'menu2':
            return (
                <MuiFormExample />
            );        
        case 'menu3':
            return (
                <TabView />
            );
        case 'menu4':
            return (
                <QstList />
            );
        
      case 'testmenu1':
        return (
          <>
            <Typography variant="h5" gutterBottom>
              Menu 2 Content
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ width: { xs: '100%', md: 'calc(50% - 8px)' } }}>
                <Paper sx={{ p: 2 }}>Menu 2 - Left Panel</Paper>
              </Box>
              <Box sx={{ width: { xs: '100%', md: 'calc(50% - 8px)' } }}>
                <Paper sx={{ p: 2 }}>Menu 2 - Right Panel</Paper>
              </Box>
            </Box>
          </>
        );
      case 'testmenu2':
        return (
          <>
            <Typography variant="h5" gutterBottom>
              Menu 3 Content
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ width: { xs: '100%', md: 'calc(50% - 8px)' } }}>
                <Paper sx={{ p: 2 }}>Menu 3 - Left Panel</Paper>
              </Box>
              <Box sx={{ width: { xs: '100%', md: 'calc(50% - 8px)' } }}>
                <Paper sx={{ p: 2 }}>Menu 3 - Right Panel</Paper>
              </Box>
            </Box>
          </>
        );
      default:
        return (
          <>
            <Typography variant="h5" gutterBottom>
              Dashboard
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ width: { xs: '100%', md: 'calc(50% - 8px)' } }}>
                <Paper sx={{ p: 2 }}>Left Panel</Paper>
              </Box>
              <Box sx={{ width: { xs: '100%', md: 'calc(50% - 8px)' } }}>
                <Paper sx={{ p: 2 }}>Right Panel</Paper>
              </Box>
            </Box>
          </>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 메뉴 */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            MUI 7 Layout
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 본문 (사이드바 + 메인) */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* 사이드바 */}
        <Box
          component="nav"
          sx={{
            width: 240,
            bgcolor: 'grey.100',
            p: 2,
            borderRight: '1px solid #ccc',
          }}
        >
          <Typography variant="h6">Sidebar</Typography>
          <Stack spacing={1} mt={2}>
            <Paper 
              sx={{ 
                p: 1, 
                bgcolor: selectedMenu === 'menu1' ? 'primary.main' : 'grey.200',
                color: selectedMenu === 'menu1' ? 'white' : 'inherit',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: selectedMenu === 'menu1' ? 'primary.dark' : 'grey.300',
                }
              }}
              onClick={() => setSelectedMenu('menu1')}
            >
              문항관리리
            </Paper>
            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: selectedMenu === 'menu2' ? 'primary.main' : 'grey.300',
                color: selectedMenu === 'menu2' ? 'white' : 'inherit',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: selectedMenu === 'menu2' ? 'primary.dark' : 'grey.400',
                }
              }}
              onClick={() => setSelectedMenu('menu2')}
            >
              샘플1
            </Paper>
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: selectedMenu === 'menu3' ? 'primary.main' : 'grey.400',
                color: selectedMenu === 'menu3' ? 'white' : 'inherit',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: selectedMenu === 'menu3' ? 'primary.dark' : 'grey.500',
                }
              }}
              onClick={() => setSelectedMenu('menu3')}
            >
              TAB기능
            </Paper>
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: selectedMenu === 'menu4' ? 'primary.main' : 'grey.400',
                color: selectedMenu === 'menu4' ? 'white' : 'inherit',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: selectedMenu === 'menu4' ? 'primary.dark' : 'grey.500',
                }
              }}
              onClick={() => setSelectedMenu('menu4')}
            >
              문항관리new
            </Paper>
          </Stack>
        </Box>

        {/* 메인 콘텐츠 */}
        <Container sx={{ flex: 1, py: 4 }}>
          {renderMainContent()}
        </Container>
      </Box>

      {/* 하단 푸터 */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'grey.800',
          color: '#fff',
          py: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">© 2025 MUI Layout Example</Typography>
      </Box>
    </Box>
  )
}