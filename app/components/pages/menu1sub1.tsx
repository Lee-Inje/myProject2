'use client';

import { Box, Typography, Paper, Card, CardContent } from '@mui/material';

export default function Menu1Sub1() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        상단메뉴1_좌측메뉴1
      </Typography>
      
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          대시보드 개요
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          mt: 2 
        }}>
          <Card sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                총 사용자
              </Typography>
              <Typography variant="h3" color="primary">
                1,234
              </Typography>
              <Typography variant="body2" color="text.secondary">
                이번 달 +12% 증가
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                총 주문
              </Typography>
              <Typography variant="h3" color="primary">
                567
              </Typography>
              <Typography variant="body2" color="text.secondary">
                이번 주 +8% 증가
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                총 매출
              </Typography>
              <Typography variant="h3" color="primary">
                ₩89M
              </Typography>
              <Typography variant="body2" color="text.secondary">
                이번 달 +15% 증가
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Typography variant="body1" sx={{ mt: 3 }}>
          이 페이지는 상단메뉴1의 첫 번째 서브메뉴입니다. 대시보드 형태로 주요 지표들을 표시합니다.
        </Typography>
      </Paper>
    </Box>
  );
} 