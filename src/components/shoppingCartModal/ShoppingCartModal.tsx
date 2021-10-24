import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { MenuItemsModel } from '@src/utils/models/menuItems.model';
import { OrderModel } from '@src/utils/models/order.model';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledIconWrapper,
  StyledShoppingCartModalWrapper,
} from './ShoppingCartModal.styled';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { removeOrderMenuITem } from '@src/store/orderStore/orderSlice';

interface Props {
  isOpen: boolean;
}

const ShoppingCartModal: React.FC<Props> = ({ isOpen }) => {
  const orderData: OrderModel = useSelector((state: any) => state.orderData);
  const dispatch = useDispatch();
  return (
    <StyledShoppingCartModalWrapper isOpen={isOpen}>
      <Table sx={{ width: '80%', margin: 'auto' }}>
        <TableHead>
          <TableCell>Łączna cena:</TableCell>
          <TableCell>
            {orderData.orderMenuItems.reduce(
              (acc, cur) => cur.menuItemPrice + acc,
              0
            ) + 'zł'}
          </TableCell>
        </TableHead>
        <TableBody>
          {orderData.orderMenuItems.map((item: MenuItemsModel) => (
            <TableRow>
              <TableCell>{item.menuItemName}</TableCell>
              <TableCell>{item.menuItemPrice + 'zł'}</TableCell>
              <TableCell>
                <StyledIconWrapper
                  onClick={() => dispatch(removeOrderMenuITem(item))}
                >
                  <RemoveCircleIcon></RemoveCircleIcon>
                </StyledIconWrapper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledShoppingCartModalWrapper>
  );
};

export default ShoppingCartModal;
