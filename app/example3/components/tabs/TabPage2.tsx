import React from 'react';
import { useTabStore } from '../../store/tabStore';
import { Box, Typography } from '@mui/material';
import SelectBoxViewComp from '@/app/example3/components/SelectBoxViewComp';

export default function TabPage2() {

    const selectedTab = useTabStore((state) => state.selectedTab);


    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography>📁 페이지 2 내용</Typography>
            <SelectBoxViewComp />
        </Box>
    );
  }