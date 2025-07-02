'use client';

import { Typography, Box, Button } from '@mui/material';
import { Inputs } from './StateViewModel';
import ButtonComponent from './ButtonComponent';

interface Props {
  inputs: Inputs;
}

// export default function DisplayComponent({ inputs, handleInputsClear }: Props) {
export default function DisplayComponent({ inputs }: Props) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">입력한 값:</Typography>
      <Typography variant="body1" color="primary">
        이름: {inputs.name} <br />
        이메일: {inputs.email} <br />
        나이: {inputs.age}
      </Typography>
      {/* <Button variant="contained" color="primary" onClick={handleInputsClear}>
        초기화
      </Button> */}

        
      
    </Box>
  );
}
