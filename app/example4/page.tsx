'use client';
import { useStateViewModel } from './StateViewModel';
import TextInputComponent from './TextInputComponent';
import DisplayComponent from './DisplayComponent';
import ClearButton from './ClearButton';
import { Box } from '@mui/material';
import UserListComponent from './UserListComponent';

export default function StateDemoPage() {
  const { inputs, userList, handleInputChange, handleInputsClear, handleAddUser, handleDeleteUser } = useStateViewModel();

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h2>MVVM 기반 상태 공유 예제</h2>
      <TextInputComponent inputs={inputs} onInputChange={handleInputChange} handleInputsClear={handleInputsClear} handleAddUser={handleAddUser} />
      {/* <DisplayComponent inputs={inputs} /> */}

      <DisplayComponent inputs={inputs}  />
      <ClearButton inputs={inputs} handleTextClear={handleInputsClear} handleAddUser={handleAddUser} />
      <UserListComponent userList={userList} handleDeleteUser={handleDeleteUser} />
        
      {/* <Box>{JSON.stringify(userList)}</Box> */}

      
    </main>
  );
}
