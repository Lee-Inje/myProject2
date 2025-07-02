// app/form/MuiFormDemo.tsx
'use client'

import {
  Box, TextField, Checkbox, FormControlLabel, RadioGroup, Radio,
  FormControl, FormLabel, Select, MenuItem, Switch, Button, Alert,
  Typography, Card, CardContent
} from '@mui/material'
import { ChangeEvent } from 'react'
import { useFormViewModel } from '../model/FormViewModel'

export default function MuiFormDemo2() {
  // ViewModel에서 상태와 로직 가져오기 
  const { form, handleChange, handleSubmit, submitted } = useFormViewModel()

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h5">Zustand + Immer + MVVM Form</Typography>

      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* 이메일 입력 */}
          <TextField
            label="이메일"
            value={form.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
            fullWidth
          />

          {/* 비밀번호 입력 */}
          <TextField
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
            fullWidth
          />

          {/* 체크박스: 이용약관 동의 */}
          <FormControlLabel
            control={
              <Checkbox
                checked={form.agree}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('agree', e.target.checked)}
              />
            }
            label="이용약관 동의"
          />

          {/* 라디오 버튼: 성별 선택 */}
          <FormControl>
            <FormLabel>성별</FormLabel>
            <RadioGroup
              row
              value={form.gender}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('gender', e.target.value as 'male' | 'female')}
            >
              <FormControlLabel value="male" control={<Radio />} label="남자" />
              <FormControlLabel value="female" control={<Radio />} label="여자" />
            </RadioGroup>
          </FormControl>

          {/* 셀렉트 박스: 도시 선택 */}
          <FormControl fullWidth>
            <FormLabel>도시</FormLabel>
            <Select
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
            >
              <MenuItem value="seoul">서울</MenuItem>
              <MenuItem value="busan">부산</MenuItem>
              <MenuItem value="jeju">제주</MenuItem>
            </Select>
          </FormControl>

          {/* 스위치: 다크모드 여부 */}
          <FormControlLabel
            control={
              <Switch
                checked={form.darkMode}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('darkMode', e.target.checked)}
              />
            }
            label="다크모드"
          />

          {/* 제출 및 취소 버튼 */}
          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={handleSubmit}>제출</Button>
            <Button variant="outlined">취소</Button>
          </Box>
        </CardContent>

        <CardContent>{JSON.stringify(form, null, 2)}</CardContent>
      </Card>

      {/* 제출 후 알림 */}
      {submitted && (
        <Alert severity="success" sx={{ mt: 2 }}>
          제출이 완료되었습니다!
        </Alert>
      )}
    </Box>
  )
}
