import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { AppState } from '@src/store';
import {
  addOrderMenuItem,
  removeOrderMenuItem,
} from '@src/store/orderStore/orderSlice';
import { MenuItemsModel } from '@src/utils/models/menuItems.model';
import { OrderModel } from '@src/utils/models/order.model';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledButtonDiv,
  StyledMakeOrderWrapper,
  StyledTablesWrapper,
} from './makeOrder.styled';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Add } from '@mui/icons-material';
import {
  PolishVariables,
  UserModel,
  UserVariablesNames,
} from '@src/utils/models/user.model';
import { Controller, useForm } from 'react-hook-form';
import { StyledInputWrapper } from '@src/views/register/Register.styled';
import api from '@utils/axios/axios.interceptor';

const MakeOrder: React.FC = () => {
  let x = 0;
  const [order, setOrder] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<any>();
  const dispatch = useDispatch();
  const orderData: OrderModel = useSelector(
    (state: AppState) => state.orderData
  );
  const userData: UserModel = useSelector((state: AppState) => state.userData);
  const defaultValues: UserModel = {
    userName: '',
    userLastName: '',
    userCity: '',
    userAdressStreetName: '',
    userAdressStreetNumber: '',
    userAdressHomeNumber: '',
    userPhoneNumber: '',
    userUsername: '',
  };
  const { control, reset, getValues } = useForm({
    mode: 'onBlur',
    defaultValues,
  });
  function handleSubmitOrder() {
    if (orderData.menuItems.length !== 0) {
      setOrder({
        menuItems: orderData.menuItems,
        orderPlaceToOrder:
          getValues().userAdressStreetName +
          '' +
          getValues().userAdressStreetNumber +
          '' +
          getValues().userAdressHomeNumber,
        orderTotalPrice: orderData.orderTotalPrice,
        orderUserName: getValues().userName || '',
        orderUserLastName: getValues().userLastName || '',
        orderUserPhoneNumber: getValues().userPhoneNumber || '',
      } as OrderModel);
    } else {
      setIsError('Brak dań w koszyku');
    }
  }
  useEffect(() => {
    if (userData.id) {
      reset(userData);
    }
  }, [userData]);
  useEffect(() => {
    if (Object.keys(order).length !== 0) {
      api
        .post('orders/addOrder', order)
        .then(() => setIsSuccess(true))
        .catch((err) => setIsError(err));
    }
  }, [order]);

  return (
    <StyledMakeOrderWrapper>
      <h2>Twoje zamówienie:</h2>
      <StyledTablesWrapper>
        <Table sx={{ width: '49%' }}>
          <TableHead sx={{ width: '100%' }}>
            <TableRow
              sx={{
                width: '100%',
              }}
            >
              <TableCell
                colSpan={4}
                sx={{ border: 'none', textAlign: 'center' }}
              >
                Zamówienie:
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ width: '100%' }}>
              <TableCell colSpan={4}></TableCell>
            </TableRow>

            {orderData.menuItems.length !== 0 ? (
              orderData.menuItems.map((item: MenuItemsModel) => {
                x++;
                return (
                  <TableRow key={x} sx={{ margin: 'auto' }}>
                    <TableCell>{item.menuItemName}</TableCell>
                    <TableCell>{item.menuItemPrice + 'zł'}</TableCell>
                    <TableCell sx={{ cursor: 'pointer' }}>
                      <div onClick={() => dispatch(addOrderMenuItem(item))}>
                        <Add></Add>
                      </div>
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer' }}>
                      <div onClick={() => dispatch(removeOrderMenuItem(item))}>
                        <RemoveCircleIcon></RemoveCircleIcon>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow sx={{ width: '100%' }}>
                <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                  Brak dodanych przedmiotów
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Divider
          orientation="vertical"
          flexItem
          variant="middle"
          sx={{ height: '100%' }}
        />
        <Box sx={{ width: '49%' }} component="form" autoComplete="off">
          <Table sx={{ width: '100%' }}>
            <TableHead sx={{ width: '100%' }}>
              <TableRow
                sx={{
                  width: '100%',
                }}
              >
                <TableCell
                  colSpan={4}
                  sx={{ border: 'none', textAlign: 'center' }}
                >
                  Twoje dane:
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ width: '100%' }}>
                <TableCell></TableCell>
              </TableRow>
              {Object.keys(defaultValues).map((defaultValue, index) =>
                // eslint-disable-next-line
                Object.values(PolishVariables).map((item, i) => {
                  if (index === i) {
                    if (
                      !(
                        item === PolishVariables.userPassword ||
                        (!userData.id && PolishVariables.userUsername === item)
                      )
                    ) {
                      return (
                        <TableRow key={i} sx={{ width: '100%' }}>
                          <TableCell>
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
                                    focused={!!userData.id}
                                    sx={{
                                      marginBottom: '0.7rem',
                                      width: '100%',
                                    }}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    size="small"
                                    type={'text'}
                                  />
                                )}
                              />
                            </StyledInputWrapper>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  }
                })
              )}

              <TableRow sx={{ width: '100%' }}></TableRow>
            </TableBody>
          </Table>
        </Box>
      </StyledTablesWrapper>
      <StyledButtonDiv>
        <Button
          onClick={handleSubmitOrder}
          sx={{
            width: '20%',
            fontSize: '2rem',
            justifySelf: 'center',
          }}
        >
          Złóż zamówienie
        </Button>
        {isSuccess ? (
          <h2>Pomyślnie złozono zamówienie</h2>
        ) : isError ? (
          <h2>
            Błąd w składaniu zamówienia <br />
            {isError}
          </h2>
        ) : (
          ''
        )}
      </StyledButtonDiv>
    </StyledMakeOrderWrapper>
  );
};
export default MakeOrder;
