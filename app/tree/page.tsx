'use client';

import { Box, Typography, Container } from '@mui/material';
import TreeView from '../components/TreeView';

export default function TreePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        트리 컴포넌트 데모
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Next.js, TypeScript, Zustand, MUI, Immer, MVVM 패턴을 사용한 트리 컴포넌트입니다.
      </Typography>
      
      <Box sx={{ height: '70vh', mt: 3 }}>
        <TreeView />
      </Box>
      
      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          사용법
        </Typography>
        <Typography variant="body2" paragraph>
          • 클릭: 항목 선택
        </Typography>
        <Typography variant="body2" paragraph>
          • 더블클릭: 폴더 펼치기/접기
        </Typography>
        <Typography variant="body2" paragraph>
          • 우클릭: 컨텍스트 메뉴 (추가, 편집, 삭제)
        </Typography>
        <Typography variant="body2" paragraph>
          • 호버: 액션 버튼 표시
        </Typography>
      </Box>
    </Container>
  );
} 