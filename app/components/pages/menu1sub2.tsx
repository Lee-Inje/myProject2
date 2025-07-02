'use client';

import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function Menu1Sub2() {
  const reportData = [
    { id: 1, name: '월간 매출 리포트', date: '2024-01-15', status: '완료', views: 156 },
    { id: 2, name: '사용자 활동 분석', date: '2024-01-14', status: '진행중', views: 89 },
    { id: 3, name: '제품 성과 리포트', date: '2024-01-13', status: '완료', views: 234 },
    { id: 4, name: '마케팅 캠페인 결과', date: '2024-01-12', status: '대기중', views: 67 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        상단메뉴1_좌측메뉴2
      </Typography>
      
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          리포트 목록
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>리포트명</TableCell>
                <TableCell>생성일</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>조회수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Typography variant="body1" sx={{ mt: 3 }}>
          이 페이지는 상단메뉴1의 두 번째 서브메뉴입니다. 리포트 목록을 테이블 형태로 표시합니다.
        </Typography>
      </Paper>
    </Box>
  );
} 