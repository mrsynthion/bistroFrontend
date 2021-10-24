import React, { useState } from 'react';
import {
  StyledButtonWrapper,
  StyledLoginModalWrapper,
  StyledParagraph,
} from './LoginModal.styled';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@src/services/hooks/useAuth';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';

type FormValues = {
  userUsername: string;
  userPassword: string;
};
const LoginModal: React.FC<{
  isOpen: boolean;
}> = ({ isOpen }) => {
  const [formData, setFormData] = useState<FormValues>({
    userUsername: '',
    userPassword: '',
  });
  const auth = useAuth();
  const defaultValues = {
    userUsername: '',
    userPassword: '',
  };
  const { control, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    reset();
  };
  useEffect(() => {
    const { userUsername, userPassword } = formData;
    if (userUsername && userPassword) {
      auth.signIn(userUsername, userPassword);
    }
  }, [formData]);

  return (
    <StyledLoginModalWrapper id="loginModal" isOpen={isOpen}>
      <Box
        sx={{
          width: '60%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="userUsername"
          control={control}
          rules={{ required: 'Nazwa uzytkownika jest wymagana' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={'Nazwa uzytkownika'}
              sx={{ marginBottom: '0.7rem' }}
              error={!!error}
              helperText={error ? error.message : null}
              size="small"
            />
          )}
        />

        <Controller
          name="userPassword"
          control={control}
          rules={{ required: 'Hasło jest wymagane' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={{ marginBottom: '0.7rem' }}
              onChange={onChange}
              value={value}
              label={'Hasło'}
              error={!!error}
              helperText={error ? error.message : null}
              type="password"
              size="small"
            />
          )}
        />
        <StyledButtonWrapper>
          <Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
            Submit
          </Button>
          <Button onClick={() => reset()} variant={'contained'}>
            Reset
          </Button>
        </StyledButtonWrapper>
        <StyledParagraph>
          {auth.loginError ? auth.loginError : ''}
        </StyledParagraph>
      </Box>
    </StyledLoginModalWrapper>
  );
};

export default LoginModal;
