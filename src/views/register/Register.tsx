import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import api from '@utils/axios/axios.interceptor';
import {
  UserVariablesNames,
  PolishVariables,
  UserModel,
} from '@src/utils/models/user.model';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  StyledInputWrapper,
  StyledRegisterInputWrapper,
  StyledSubmittingParagraph,
} from './Register.styled';
import { useDispatch } from 'react-redux';
import { setUserData } from '@src/store/userDataStore/userSlice';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<UserModel>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const defaultValues: UserModel = {
    id: undefined,
    userName: '',
    userLastName: '',
    userCity: '',
    userAdressStreetName: '',
    userAdressStreetNumber: '',
    userAdressHomeNumber: '',
    userPhoneNumber: '',
    userUsername: '',
    userPassword: '',
  };
  const { control, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = (data: UserModel) => {
    setFormData(data);
  };
  useEffect(() => {
    if (formData) {
      api
        .post('users/addUser', {
          ...formData,
        })
        .then((res: any) => {
          console.log(res);
          if (res.status === 201) {
            setSuccess('Konto zostało utworzone');
            dispatch(setUserData(res.data));
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
    // eslint-disable-next-line
  }, [formData]);

  return (
    <Box
      sx={{
        height: '60%',
        width: '50%',
        margin: '15% auto 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        boxShadow:
          'rgb(0 0 0 / 8%) 0px 2px 4px 0px, rgb(0 0 0 / 8%) 0px 0px 2px 1px',
        borderRadius: '50px',
        textAlign: 'center',
        backgroundColor: '#FFE082',
        color: '#fff',
      }}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledRegisterInputWrapper>
        <div></div>
        <div></div>
        {Object.keys(defaultValues).map((defaultValue, index) =>
          // eslint-disable-next-line
          Object.values(PolishVariables).map((item, i) => {
            if (index === i) {
              return item === PolishVariables.id ||
                item === PolishVariables.userType ? null : item ===
                PolishVariables.userUsername ? (
                <StyledInputWrapper key={defaultValue} value={item}>
                  <Controller
                    name={defaultValue as UserVariablesNames}
                    control={control}
                    rules={{
                      required: `Pole "${item.toLowerCase()}" jest wymagane`,
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        onChange={onChange}
                        value={value}
                        label={item}
                        sx={{ marginBottom: '0.7rem', width: '100%' }}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"
                        type={'text'}
                      />
                    )}
                  />
                </StyledInputWrapper>
              ) : (
                <StyledInputWrapper key={defaultValue} value={item}>
                  <Controller
                    name={defaultValue as UserVariablesNames}
                    control={control}
                    rules={{
                      required: `Pole "${item.toLowerCase()}" jest wymagane`,
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        onChange={onChange}
                        value={value}
                        label={item}
                        sx={{ marginBottom: '0.7rem', width: '100%' }}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"
                        type={
                          item === PolishVariables.userPassword
                            ? 'password'
                            : 'text'
                        }
                      />
                    )}
                  />
                </StyledInputWrapper>
              );
            }
          })
        )}

        <Button
          onClick={handleSubmit(onSubmit)}
          variant={'contained'}
          sx={{ width: '80%', margin: 'auto', height: '60%' }}
        >
          Zarejestruj się
        </Button>
        <Button
          onClick={() => {
            reset();
            setError('');
            setSuccess('');
          }}
          variant={'contained'}
          sx={{ width: '80%', margin: 'auto', height: '60%' }}
        >
          Reset
        </Button>
      </StyledRegisterInputWrapper>
      <StyledSubmittingParagraph error={!!error} success={!!success}>
        {error ? error : success}
      </StyledSubmittingParagraph>
    </Box>
  );
};

export default Register;
