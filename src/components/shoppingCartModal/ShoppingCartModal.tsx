import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { MenuItemsModel } from '@src/utils/models/menuItems.model';
import { OrderModel } from '@src/utils/models/order.model';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledIconWrapper,
  StyledShoppingCartModalWrapper,
} from './ShoppingCartModal.styled';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { removeOrderMenuItem } from '@src/store/orderStore/orderSlice';
import { AppState } from '@src/store';

export interface ShoppingCartProps {
  isOpen: boolean;
}

const ShoppingCartModal: React.FC<ShoppingCartProps> = ({ isOpen }) => {
  let x = 0;
  const orderData: OrderModel = useSelector(
    (state: AppState) => state.orderData
  );
  const dispatch = useDispatch();
  return (
    <StyledShoppingCartModalWrapper isOpen={isOpen}>
      <Table
        sx={{
          width: '80%',
          height: '100%',
          margin: 'auto',
          position: 'relative',
        }}
      >
        <TableHead
          sx={{
            position: 'absolute',
            top: '0',
            height: '15%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            placeContent: 'center',
          }}
        >
          <TableRow>
            <TableCell>Łączna koszt:</TableCell>
            <TableCell>
              {orderData.menuItems.reduce(
                (acc, cur) => cur.menuItemPrice + acc,
                0
              ) + 'zł'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            position: 'absolute',
            top: '20%',
            overflow: 'scroll',

            height: '60%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'center',
          }}
        >
          {orderData.menuItems.map((item: MenuItemsModel) => {
            x++;
            return (
              <TableRow key={x} sx={{ margin: 'auto' }}>
                <TableCell>{item.menuItemName}</TableCell>
                <TableCell>{item.menuItemPrice + 'zł'}</TableCell>
                <TableCell>
                  <StyledIconWrapper
                    onClick={() => dispatch(removeOrderMenuItem(item))}
                  >
                    <RemoveCircleIcon></RemoveCircleIcon>
                  </StyledIconWrapper>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: '0',
          }}
        >
          <TableRow
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TableCell sx={{ fontSize: '1.2rem' }}>
              <StyledIconWrapper
                as={NavLink}
                to="/makeOrder"
                style={{ justifyContent: 'center' }}
              >
                Złóz zamówienie
              </StyledIconWrapper>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </StyledShoppingCartModalWrapper>
  );
};

export default ShoppingCartModal;
