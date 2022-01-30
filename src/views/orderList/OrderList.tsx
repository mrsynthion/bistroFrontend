import {
  OrderModel,
  PolishOrderVariables,
} from '@src/utils/models/order.model';
import React, { useEffect, useState } from 'react';
import api from '@utils/axios/axios.interceptor';
import { StyledIconButton, StyledOrderListWrapper } from './OrderList.styled';
import GenericTable, {
  GenericTableColumns,
  GenericTableRows,
} from '@src/components/table/Table';
import {
  TranslateObjectColumns,
  TranslateObjectRows,
} from '@src/utils/genericTableObjectFunc/GenericTableObjectFunc';
import InfoIcon from '@mui/icons-material/Info';
import { NavLink } from 'react-router-dom';

const OrderList: React.FC = () => {
  const [columns, setColumns] = useState<GenericTableColumns[]>([]);
  const [rows, setRows] = useState<GenericTableRows[]>([]);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [newOrder, setNewOrder] = useState<any>({
    id: null,
    orderIsSent: false,
    orderIsAccepted: false,
  });

  useEffect(() => {
    if (newOrder.id) {
      api
        .post('orders/update', {
          ...newOrder,
        })
        .then(() => {
          const newOrders = orders.map((order) =>
            order.id === newOrder.id
              ? {
                  ...order,
                  orderIsSent: newOrder.orderIsSent,
                  orderIsAccepted: newOrder.orderIsAccepted,
                }
              : order
          );
          setOrders(newOrders);
        })
        .catch((e) => console.log(e));
      setNewOrder({
        id: null,
        orderIsSent: false,
        orderIsAccepted: false,
      });
    }
  }, [newOrder]);

  useEffect(() => {
    api
      .get('orders/history')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    const flattenMenuItems = orders.map((order) => {
      const newOrder: any = {
        ...order,
        orderTotalPrice: `${order.orderTotalPrice} zł`,
        details: (
          <StyledIconButton as={NavLink} to={`/admin/order/${order.id}`}>
            <InfoIcon></InfoIcon>
          </StyledIconButton>
        ),
      };
      delete newOrder['menuItems'];
      return newOrder;
    });
    let newPolishVariables: any = PolishOrderVariables;
    delete newPolishVariables['menuItems'];
    newPolishVariables = { ...newPolishVariables, details: 'Szczegóły' };
    setColumns(TranslateObjectColumns(newPolishVariables));
    setRows(TranslateObjectRows(flattenMenuItems));
  }, [orders]);
  return (
    <StyledOrderListWrapper>
      <GenericTable columns={columns} tableRows={rows}></GenericTable>
    </StyledOrderListWrapper>
  );
};

export default OrderList;
