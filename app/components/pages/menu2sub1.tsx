'use client';

import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@mui/material';
import { Person, AdminPanelSettings, VerifiedUser } from '@mui/icons-material';

export default function Menu2Sub1() {
  const users = [
    { id: 1, name: '김철수', email: 'kim@example.com', role: '관리자', status: '활성' },
    { id: 2, name: '이영희', email: 'lee@example.com', role: '사용자', status: '활성' },
    { id: 3, name: '박민수', email: 'park@example.com', role: '관리자', status: '비활성' },
    { id: 4, name: '정수진', email: 'jung@example.com', role: '사용자', status: '활성' },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case '관리자':
        return <AdminPanelSettings />;
      case '사용자':
        return <Person />;
      default:
        return <VerifiedUser />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === '활성' ? 'success' : 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        상단메뉴2_좌측메뉴1
      </Typography>
      
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          사용자 관리
        </Typography>
        
        <List>
          {users.map((user) => (
            <ListItem key={user.id} divider>
              <ListItemAvatar>
                <Avatar>
                  {getRoleIcon(user.role)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={user.email}
              />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip 
                  label={user.role} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
                <Chip 
                  label={user.status} 
                  size="small" 
                  color={getStatusColor(user.status) as any}
                />
              </Box>
            </ListItem>
          ))}
        </List>
        
        <Typography variant="body1" sx={{ mt: 3 }}>
          이 페이지는 상단메뉴2의 첫 번째 서브메뉴입니다. 사용자 목록을 관리할 수 있습니다.
        </Typography>
      </Paper>
    </Box>
  );
} 