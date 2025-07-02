'use client';

import { Box } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function LayoutView({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            backgroundColor: '#f5f5f5',
            pt: '64px', // Header 높이만큼 padding-top 추가
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
