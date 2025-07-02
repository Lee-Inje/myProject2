'use client';

import { Typography, Box, Button } from '@mui/material';
import { Inputs } from './StateViewModel';

type Props = {
  inputs: Inputs;
  handleTextClear: () => void;
  handleAddUser: (inputs: Inputs) => void;
};

export default function ClearButton({ inputs, handleTextClear, handleAddUser }: Props) {
  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" color="primary" onClick={() => handleTextClear()}>초기화</Button> &nbsp;
      <Button variant="contained" color="primary" onClick={() => handleAddUser(inputs)}>추가</Button>
    </Box>
  );
}
