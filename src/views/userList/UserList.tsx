import React, { useEffect, useState } from 'react';
import {
  StyledUserColumn,
  StyledUserListWrapper,
  StyledUserRow,
} from './UserList.styled';
import api from '@utils/axios/axios.interceptor';
import {
  EnglishVariables,
  PolishVariables,
  UserModel,
} from '@src/utils/models/user.model';
import { Divider } from '@mui/material';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  useEffect(() => {
    api
      .get('users')
      .then((res) => setUsers(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <StyledUserListWrapper>
      {users && users.map((user) => <h1>{user.userName}</h1>)}
    </StyledUserListWrapper>
  );
};
export default UserList;
