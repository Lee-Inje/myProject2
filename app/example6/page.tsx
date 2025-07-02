'use client';

import { useState, useRef } from 'react';
import { Box, Typography, Paper, TextField, Popper, ClickAwayListener, Stack } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import DateRangeInput, { DateRangeValue } from './components/DateRangeInput';

export default function Example6Page() {
    
  const [dateRange, setDateRange] = useState<DateRangeValue>({ startDate: null, endDate: null } as DateRangeValue);

  return (
    <Box sx={{ p: 4 }}>
      <DateRangeInput value={dateRange} onChange={setDateRange} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            선택된 기간: {dateRange.startDate ? dayjs(dateRange.startDate).format('YYYY.MM.DD') : '-'} ~ {dateRange.endDate ? dayjs(dateRange.endDate).format('YYYY.MM.DD') : '-'}
          </Typography>
        </Box>
    </Box>
  );
}