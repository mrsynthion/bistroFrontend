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
  UserVariablesNames,
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
      {users &&
        users.map((user) => (
          <StyledUserColumn key={user.id}>
            <StyledUserColumn>
              {Object.keys(EnglishVariables).map((variable, i) =>
                Object.values(PolishVariables).map((item, index) => {
                  if (
                    i === index &&
                    variable !== EnglishVariables.id &&
                    variable !== EnglishVariables.userPassword
                  ) {
                    return (
                      <StyledUserRow key={variable}>
                        <h4 style={{ color: 'grey' }}>{item}</h4>
                        <h4>
                          {
                            //@ts-ignore
                            user[variable]
                          }
                        </h4>
                      </StyledUserRow>
                    );
                  }
                })
              )}
            </StyledUserColumn>
            <Divider
              orientation="horizontal"
              flexItem
              variant="middle"
              sx={{ width: '100%' }}
            />
          </StyledUserColumn>
        ))}
    </StyledUserListWrapper>
  );
};
export default UserList;
