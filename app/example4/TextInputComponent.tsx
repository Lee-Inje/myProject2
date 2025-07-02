'use client';

import { TextField, Box, Typography } from '@mui/material';
import { Inputs } from './StateViewModel';
import ButtonComponent from './ButtonComponent';

interface Props {
  inputs: Inputs;
  onInputChange: (field: keyof Inputs, value: string | number) => void;
  handleInputsClear: () => void;
  handleAddUser: (inputs: Inputs) => void;
}

export default function TextInputComponent({ inputs, onInputChange, handleInputsClear, handleAddUser }: Props) {
  return (
    <Box sx={{ mb: 2 }}>
      <ButtonComponent inputs={inputs} handleTextClear={handleInputsClear} handleAddUser={handleAddUser} />
      <Box sx={{ 
        borderBottom: '1px solid #e0e0e0', 
        mb: 2, 
        pb: 1 
      }} />
      <TextField
        label="이름"
        value={inputs.name}
        onChange={e => onInputChange('name', e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="이메일"
        value={inputs.email}
        onChange={e => onInputChange('email', e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="나이"
        type="number"
        value={inputs.age}
        onChange={e => onInputChange('age', e.target.value)}
        fullWidth
      />
    </Box>
  );
}
