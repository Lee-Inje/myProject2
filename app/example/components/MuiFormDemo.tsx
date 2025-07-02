'use client' // Next.js의 클라이언트 컴포넌트로 지정

// MUI에서 자주 사용하는 UI 컴포넌트들 import
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Switch,
  Button,
  Alert,
  Typography,
  Card,
  CardContent,
} from '@mui/material'

import { useState } from 'react' // 컴포넌트 내부 상태를 관리하기 위한 React Hook

export default function MuiFormDemo() {
  // 상태 변수 정의 (useState로 입력값 관리)
  const [email, setEmail] = useState('') // 이메일 입력값
  const [password, setPassword] = useState('') // 비밀번호 입력값
  const [checked, setChecked] = useState(false) // 체크박스 체크 여부
  const [gender, setGender] = useState('male') // 라디오 선택값
  const [city, setCity] = useState('seoul') // 셀렉트 박스 선택값
  const [darkMode, setDarkMode] = useState(false) // 스위치 체크 여부
  const [showAlert, setShowAlert] = useState(false) // 알림 메시지 표시 여부

  // 제출 버튼 클릭 시 동작
  const handleSubmit = () => {
    setShowAlert(true) // 알림 표시
  }

  return (
    <Box
      sx={{
        maxWidth: 600, // 최대 너비
        mx: 'auto', // 가운데 정렬
        p: 4, // 패딩
        display: 'flex',
        flexDirection: 'column',
        gap: 3, // 각 요소 사이 간격
      }}
    >
      {/* 제목 */}
      <Typography variant="h5">MUI Form 샘플</Typography>

      {/* 전체 폼을 감싸는 카드 UI */}
      <Card variant="outlined">
        <CardContent>
          {/* 이메일 입력 필드 */}
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* 비밀번호 입력 필드 */}
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* 체크박스 (약관 동의 여부) */}
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            }
            label="이용약관 동의"
          />

          {/* 라디오 버튼 그룹 (성별 선택) */}
          <FormControl sx={{ mt: 2 }}>
            <FormLabel>성별</FormLabel>
            <RadioGroup
              row
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="남자" />
              <FormControlLabel value="female" control={<Radio />} label="여자" />
            </RadioGroup>
          </FormControl>

          {/* 셀렉트 박스 (도시 선택) */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>도시</FormLabel>
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <MenuItem value="seoul">서울</MenuItem>
              <MenuItem value="busan">부산</MenuItem>
              <MenuItem value="jeju">제주</MenuItem>
            </Select>
          </FormControl>

          {/* 스위치 (다크모드 여부) */}
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
            }
            label="다크모드"
            sx={{ mt: 2 }}
          />

          {/* 제출/취소 버튼 */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              제출
            </Button>
            <Button variant="outlined">취소</Button>
          </Box>
        </CardContent>
      </Card>

      {/* 제출 후 표시되는 성공 알림 */}
      {showAlert && (
        <Alert severity="success">폼이 성공적으로 제출되었습니다!</Alert>
      )}
    </Box>
  )
}
