'use client';

import { Box, Typography, Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Switch, Slider, Button } from '@mui/material';

export default function Menu2Sub2() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        상단메뉴2_좌측메뉴2
      </Typography>
      
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          시스템 설정
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* 테마 설정 */}
          <FormControl component="fieldset">
            <FormLabel component="legend">테마 설정</FormLabel>
            <RadioGroup defaultValue="light">
              <FormControlLabel value="light" control={<Radio />} label="라이트 모드" />
              <FormControlLabel value="dark" control={<Radio />} label="다크 모드" />
              <FormControlLabel value="auto" control={<Radio />} label="시스템 설정 따르기" />
            </RadioGroup>
          </FormControl>

          {/* 알림 설정 */}
          <FormControl component="fieldset">
            <FormLabel component="legend">알림 설정</FormLabel>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="이메일 알림"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="푸시 알림"
              />
              <FormControlLabel
                control={<Switch />}
                label="SMS 알림"
              />
            </Box>
          </FormControl>

          {/* 언어 설정 */}
          <FormControl component="fieldset">
            <FormLabel component="legend">언어 설정</FormLabel>
            <RadioGroup defaultValue="ko">
              <FormControlLabel value="ko" control={<Radio />} label="한국어" />
              <FormControlLabel value="en" control={<Radio />} label="English" />
              <FormControlLabel value="ja" control={<Radio />} label="日本語" />
            </RadioGroup>
          </FormControl>

          {/* 폰트 크기 설정 */}
          <Box>
            <Typography gutterBottom>폰트 크기</Typography>
            <Slider
              defaultValue={16}
              min={12}
              max={24}
              step={1}
              marks
              valueLabelDisplay="auto"
              sx={{ width: 300 }}
            />
          </Box>

          {/* 버튼 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary">
              설정 저장
            </Button>
            <Button variant="outlined">
              기본값으로 복원
            </Button>
          </Box>
        </Box>
        
        <Typography variant="body1" sx={{ mt: 3 }}>
          이 페이지는 상단메뉴2의 두 번째 서브메뉴입니다. 시스템 설정을 관리할 수 있습니다.
        </Typography>
      </Paper>
    </Box>
  );
} 