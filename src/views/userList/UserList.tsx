import React, { useEffect, useState } from 'react';
import { StyledUserListWrapper } from './UserList.styled';
import api from '@utils/axios/axios.interceptor';
import { PolishVariables, UserModel } from '@src/utils/models/user.model';
import GenericTable, {
  GenericTableColumns,
  GenericTableRows,
} from '@src/components/table/Table';
import {
  TranslateObjectColumns,
  TranslateObjectRows,
} from '@src/utils/genericTableObjectFunc/GenericTableObjectFunc';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  useEffect(() => {
    api
      .get('users')
      .then((res) => setUsers(res.data))
      .catch((e) => console.log(e));
  }, []);

  const columns: GenericTableColumns[] =
    TranslateObjectColumns(PolishVariables);

  const rows: GenericTableRows[] = TranslateObjectRows(users);

  return (
    <StyledUserListWrapper>
      <GenericTable columns={columns} tableRows={rows}></GenericTable>
    </StyledUserListWrapper>
  );
};
export default UserList;
