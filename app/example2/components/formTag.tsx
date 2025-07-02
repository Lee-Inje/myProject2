// MuiFormExample.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

export default function MuiFormExample() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    agree: false,
    subscribe: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h5" gutterBottom>
        MUI 7 Form Example
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        - formData ::{ JSON.stringify(formData) }
      </Box>
      <Divider />
      <Stack spacing={3}>
        {/* 이름 */}
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        {/* 나이 */}
        <FormControl fullWidth>
          <InputLabel>Age</InputLabel>
          <Select name="age" value={formData.age} label="Age" >     {/* onChange ={handleChange} */}
            <MenuItem value="10">10대</MenuItem>
            <MenuItem value="20">20대</MenuItem>
            <MenuItem value="30">30대</MenuItem>
          </Select>
        </FormControl>

        {/* 성별 */}
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="남성" />
            <FormControlLabel value="female" control={<Radio />} label="여성" />
          </RadioGroup>
        </FormControl>

        {/* 약관 동의 (체크박스) */}
        <FormControlLabel
          control={
            <Checkbox
              name="agree"
              checked={formData.agree}
              onChange={handleCheckboxChange}
            />
          }
          label="약관에 동의합니다"
        />

        {/* 뉴스레터 구독 여부 (스위치) */}
        <FormControlLabel
          control={
            <Switch
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleCheckboxChange}
            />
          }
          label="뉴스레터 구독"
        />

        <Button type="submit" variant="contained">
          제출
        </Button>
      </Stack>
    </Box>
  );
}
