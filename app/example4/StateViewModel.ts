'use client';

import { useState } from 'react';

export interface Inputs {
  name: string;
  email: string;
  age: number;
}

export interface User extends Inputs {
  id: number;
}

export function useStateViewModel() {
  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    email: '',
    age: 0,
  });

  const [userList, setUserList] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 25 },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 35 },  
  ]);

  const handleInputChange = (field: keyof Inputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: field === 'age' ? Number(value) : value,
    }));
  };

  const handleInputsClear = () => {
    setInputs({
      name: '',
      email: '',
      age: 0,
    });
  };

  const handleAddUser = (inputs: Inputs) => {
    setUserList(prev => {
      const newUser = { ...inputs, id: prev.length + 1 };
      alert("추가된 사용자: " + newUser.name);
      return [...prev, newUser];
    });
    handleInputsClear();
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("삭제하시겠습니까?")) {
      setUserList(prev => prev.filter(user => user.id !== id));
    }
  };

  return {
    inputs,
    userList,
    handleInputChange,
    handleInputsClear,
    handleAddUser,
    handleDeleteUser,
  };
}
