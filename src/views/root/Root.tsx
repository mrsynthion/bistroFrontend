import { api } from '@src/utils/axios/axios.interceptor';
import React, { useEffect, useState } from 'react';
import { StyledWrapper } from './Root.styled';

const Root: React.FC = () => {
  const userDataPath = '/users/userData';
  const [user, setUser] = useState();

  useEffect(() => {
    api
      .post(userDataPath, {
        withCredentials: true,
      })
      .then((res: any) => {
        setUser(res.body);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <StyledWrapper>
      <h1>siema</h1>
    </StyledWrapper>
  );
};
export default Root;
