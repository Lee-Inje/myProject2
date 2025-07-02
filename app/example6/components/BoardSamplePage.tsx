'use client';

import { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText, Card, CardContent, Grid, TextField, Button, Stack, Pagination } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const rows = [
  { id: 1, title: '공지사항 1', author: '관리자', date: '2024-06-01' },
  { id: 2, title: '공지사항 2', author: '홍길동', date: '2024-06-02' },
  { id: 3, title: '공지사항 3', author: '이순신', date: '2024-06-03' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: '번호', width: 90 },
  { field: 'title', headerName: '제목', width: 200 },
  { field: 'author', headerName: '작성자', width: 120 },
  { field: 'date', headerName: '작성일', width: 120 },
];

export default function BoardSamplePage() {
  const [search, setSearch] = useState({ title: '', author: '' });
  const [filtered, setFiltered] = useState(rows);
  const [page, setPage] = useState(1);
  const rowsPerPage = 2;
  const paged = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // DataGrid 페이징 상태
  const [dgPage, setDgPage] = useState(0); // DataGrid는 0-based
  const [dgPageSize, setDgPageSize] = useState(2);
  const dgPagedRows = filtered.slice(dgPage * dgPageSize, (dgPage + 1) * dgPageSize);

  const handleSearch = () => {
    setFiltered(
      rows.filter(
        (row) =>
          row.title.includes(search.title) &&
          row.author.includes(search.author)
      )
    );
  };

  const handlePageChange = (_: any, value: number) => setPage(value);

  return (
    <Box sx={{ p: 4 }}>
      {/* 검색 영역 */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            label="제목 검색"
            size="small"
            value={search.title}
            onChange={e => setSearch(s => ({ ...s, title: e.target.value }))}
          />
          <TextField
            label="작성자 검색"
            size="small"
            value={search.author}
            onChange={e => setSearch(s => ({ ...s, author: e.target.value }))}
          />
          <Button variant="contained" onClick={handleSearch}>검색</Button>
        </Stack>
      </Paper>

      <Typography variant="h5" gutterBottom>1. 기본 MUI Table 게시판</Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>2. DataGrid 게시판</Typography>
      <Box sx={{ height: 300, mb: 4 }}>
        <DataGrid rows={filtered} columns={columns} pageSizeOptions={[5]} />
      </Box>

      <Typography variant="h5" gutterBottom>2-1. DataGrid 서버형 페이징 샘플</Typography>
      <Box sx={{ height: 300, mb: 4 }}>
        <DataGrid
          rows={dgPagedRows}
          columns={columns}
          rowCount={filtered.length}
          pageSizeOptions={[2, 5, 10]}
          pagination
          paginationMode="server"
          paginationModel={{ page: dgPage, pageSize: dgPageSize }}
          onPaginationModelChange={({ page, pageSize }) => {
            setDgPage(page);
            setDgPageSize(pageSize);
          }}
        />
      </Box>

      <Typography variant="h5" gutterBottom>3. 카드형 게시판</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {filtered.map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{row.title}</Typography>
                <Typography color="text.secondary" gutterBottom>
                  {row.author} | {row.date}
                </Typography>
                <Typography variant="body2">게시글 내용 예시...</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>4. 간단 리스트형 게시판</Typography>
      <Paper>
        <List>
          {filtered.map((row) => (
            <ListItem key={row.id} divider>
              <ListItemText
                primary={row.title}
                secondary={`${row.author} | ${row.date}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* 한국형 게시판 스타일 */}
      <Typography variant="h5" gutterBottom sx={{ mt: 6 }}>5. 한국형 게시판 스타일 (공지/자료실 등)</Typography>
      <TableContainer component={Paper} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f7f7f7' }}>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: '#333', width: 80 }}>번호</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>제목</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333', width: 120 }}>작성자</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: '#333', width: 120 }}>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ cursor: 'pointer', '&:hover td': { backgroundColor: '#e3f2fd' } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell>
                  <span style={{ color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}>{row.title}</span>
                </TableCell>
                <TableCell align="center">{row.author}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mb={4}>
        <Pagination
          count={Math.ceil(filtered.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}