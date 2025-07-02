'use client';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { User } from './StateViewModel';
import { Box } from '@mui/material';

interface Props {
  userList: User[];
  handleDeleteUser: (id: number) => void;
}

export default function UserListComponent({ userList, handleDeleteUser }: Props) {
  const columns: GridColDef<User>[] = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
    { 
      field: 'name', 
      headerName: '이름', 
      flex: 1, 
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<User>) => (
        <div
          style={{
            cursor: 'pointer',
            color: '#1976d2',
            textDecoration: 'underline',
            fontWeight: 'bold'
          }}
          onClick={() => {
            alert(`사용자 정보:\nID: ${params.row.id}\n이름: ${params.row.name}\n이메일: ${params.row.email}\n나이: ${params.row.age}`);
            
          }}
        >
          {params.row.name}
        </div>
      )
    },
    { field: 'email', headerName: '이메일', flex: 1.5, minWidth: 180 },
    { field: 'age', headerName: '나이', flex: 0.7, minWidth: 80, type: 'number' },
    {
      field: 'actions',
      headerName: '삭제',
      flex: 0.7,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams<User>) => (
        <button
          style={{
            color: 'white',
            backgroundColor: '#d32f2f',
            border: 'none',
            borderRadius: 4,
            padding: '4px 12px',
            cursor: 'pointer'
            }}
            onClick={() => {
            // 삭제 기능은 상위 컴포넌트에서 구현 필요
           // alert(`삭제 기능은 아직 구현되지 않았습니다. (id: ${params.row.id})`);
            handleDeleteUser(params.row.id);
            }}
        >
          삭제
        </button>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
  ];

  return (
    <div style={{ height: 215, width: '100%', marginTop: 24 }}>
      <DataGrid
        rows={userList}
        columns={columns}
        pageSizeOptions={[2, 4, 6]}
        initialState={{ pagination: { paginationModel: { pageSize: 2, page: 0 } } }}
        disableRowSelectionOnClick
      />

      <Box sx={{ mt: 1, fontSize: 12, pt: 3, pl: 1 }}>
      {userList.map((user) => (
        <div key={user.id}>{user.id} {user.name} {user.email} {user.age}</div>
      ))}
        </Box>
    </div>
  );
}