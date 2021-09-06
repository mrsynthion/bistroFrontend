import React, { useState } from 'react';
import { StyledLoginModalWrapper } from './LoginModal.styled';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';

import { classNames } from 'primereact/utils';
import { useAuth } from '@src/services/hooks/useAuth';
import { useEffect } from 'react';

type FormValues = {
  userUsername: string;
  userPassword: string;
};
const LoginModal: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [formData, setFormData] = useState<FormValues>({
    userUsername: '',
    userPassword: '',
  });
  const auth = useAuth();
  const defaultValues = {
    userUsername: '',
    userPassword: '',
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    reset();
  };
  useEffect(() => {
    const { userUsername, userPassword } = formData;

    auth.signIn(userUsername, userPassword);
  }, [formData]);

  return (
    <StyledLoginModalWrapper isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="p-field">
          <span className="p-float-label">
            <Controller
              name="userUsername"
              control={control}
              rules={{ required: 'Nazwa uzytkownika jest wymagana' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  autoFocus
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="username"
              className={classNames({ 'p-error': errors.userUsername })}
            >
              Nazwa uzytkownika*
            </label>
          </span>
        </div>
        <Divider />
        <div className="p-field">
          <span className="p-float-label">
            <Controller
              name="userPassword"
              control={control}
              rules={{ required: 'Hasło jest wymagane' }}
              render={({ field, fieldState }) => (
                <Password
                  feedback={false}
                  id={field.name}
                  {...field}
                  toggleMask
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="userPassword"
              className={classNames({ 'p-error': errors.userPassword })}
            >
              Hasło*
            </label>
          </span>
        </div>
        <Divider />
        <Button type="submit" label="Zaloguj" className="p-mt-2" />
      </form>
    </StyledLoginModalWrapper>
  );
};

export default LoginModal;
