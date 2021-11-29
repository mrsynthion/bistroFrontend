import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { AppState } from '@src/store';
import api from '@utils/axios/axios.interceptor';
import {
  UserModel,
  PolishVariables,
  UserVariablesNames,
} from '@src/utils/models/user.model';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledTableWrapper,
  StyledUserDataInput,
  StyledUserDataInputWrapper,
  StyledUserDataSubmittingParagraph,
} from './UserData.styled';

const UserDataView: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<UserModel>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userData = useSelector((state: AppState) => state.userData);
  const [orderHistory, setOrderHistory] = useState<any>([]);

  const { control, handleSubmit, reset } = useForm({ defaultValues: formData });

  const onSubmit = (data: UserModel) => {
    setFormData(data);
  };
  useEffect(() => {
    reset(userData);
    setFormData(userData);
  }, [userData]);
  useEffect(() => {
    api.get('orders/history').then((data: any) => {
      console.log(data);
      setOrderHistory(data.data);
    });
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '49% 1% 49%',
        boxShadow:
          'rgb(0 0 0 / 8%) 0px 2px 4px 0px, rgb(0 0 0 / 8%) 0px 0px 2px 1px',
        borderRadius: '50px',
        textAlign: 'center',

        color: '#fff',
      }}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledUserDataInputWrapper>
        <div></div>
        <div></div>
        {formData
          ? Object.keys(formData).map((defaultValue, index) =>
              // eslint-disable-next-line
              Object.values(PolishVariables).map((item, i) => {
                if (index === i) {
                  return (
                    <StyledUserDataInput key={defaultValue} value={item}>
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
                    </StyledUserDataInput>
                  );
                }
              })
            )
          : ''}

        <Button
          onClick={handleSubmit(onSubmit)}
          variant={'contained'}
          sx={{ width: '80%', margin: 'auto', height: '60%' }}
        >
          Zapisz
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
        <StyledUserDataSubmittingParagraph error={!!error} success={!!success}>
          {error ? error : success}
        </StyledUserDataSubmittingParagraph>
      </StyledUserDataInputWrapper>

      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        sx={{ height: '100%' }}
      />
      <div style={{ overflow: 'scroll' }}>
        {orderHistory?.map((item: any) => (
          <StyledTableWrapper key={item.id}>
            <h2>
              Zamówienie nr {item.id} z dnia{' '}
              {new Date(item.createdAt).toLocaleString()}
            </h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nazwa</TableCell>
                  <TableCell>Kategoria</TableCell>
                  <TableCell>Skład</TableCell>
                  <TableCell>Cena</TableCell>
                  <TableCell>Przyjęte?</TableCell>
                  <TableCell>Dostarczone?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.menuItems.map((menuItem: any) => (
                  <TableRow>
                    <TableCell>{menuItem.menuItemName}</TableCell>
                    <TableCell>{menuItem.menuItemCategory}</TableCell>
                    <TableCell>{menuItem.menuItemDescription}</TableCell>
                    <TableCell>{menuItem.menuItemPrice}</TableCell>
                    <TableCell>
                      {item.orderIsAccepted ? 'Tak' : 'Nie'}
                    </TableCell>
                    <TableCell>{item.orderIsSent ? 'Tak' : 'Nie'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableWrapper>
        ))}
      </div>
    </Box>
  );
};

export default UserDataView;
