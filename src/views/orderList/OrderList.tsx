import {
  EnglishOrderVariables,
  OrderModel,
  PolishOrderVariables,
} from '@src/utils/models/order.model';
import React, { useEffect, useState } from 'react';
import api from '@utils/axios/axios.interceptor';
import {
  StyledLineWrapper,
  StyledOrderListWrapper,
  StyledOrderWrapper,
} from './OrderList.styled';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { StyledTableWrapper } from '../userData/UserData.styled';

const OrderList: React.FC = () => {
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
  return (
    <StyledOrderListWrapper>
      {orders.map((order) => (
        <StyledOrderWrapper key={order.id}>
          {Object.keys(EnglishOrderVariables).map((engVar, index) =>
            Object.values(PolishOrderVariables).map((polVar, i) => {
              if (index === i) {
                return (
                  <StyledLineWrapper key={engVar}>
                    <h4>
                      {polVar === PolishOrderVariables.menuItems ||
                      polVar === PolishOrderVariables.orderIsAccepted ||
                      polVar === PolishOrderVariables.orderIsSent
                        ? ''
                        : polVar}
                    </h4>
                    <h4>
                      {
                        //@ts-ignore
                        typeof order[engVar] === 'string' ||
                        //@ts-ignore
                        typeof order[engVar] === 'number' ? (
                          //@ts-ignore
                          order[engVar]
                        ) : //@ts-ignore
                        Array.isArray(order[engVar]) ? (
                          //@ts-ignore

                          <StyledTableWrapper
                            key={(order.id as number) * 5000000}
                          >
                            <h2>
                              Zamówienie nr {order.id} z dnia{' '}
                              {new Date(
                                order?.createdAt || Date.now()
                              ).toLocaleString()}
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
                                {order.menuItems.map((menuItem, ix) => (
                                  <TableRow key={ix}>
                                    <TableCell>
                                      {menuItem.menuItemName}
                                    </TableCell>
                                    <TableCell>
                                      {menuItem.menuItemCategory}
                                    </TableCell>
                                    <TableCell>
                                      {menuItem.menuItemDescription}
                                    </TableCell>
                                    <TableCell>
                                      {menuItem.menuItemPrice}
                                    </TableCell>
                                    <TableCell>
                                      {order.orderIsAccepted ? 'Tak' : 'Nie'}
                                    </TableCell>
                                    <TableCell>
                                      {order.orderIsSent ? 'Tak' : 'Nie'}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </StyledTableWrapper>
                        ) : null
                      }
                    </h4>
                  </StyledLineWrapper>
                );
              }
            })
          )}
          <StyledLineWrapper>
            <Button
              onClick={() =>
                setNewOrder({
                  ...newOrder,
                  id: order.id,
                  orderIsAccepted: true,
                  orderIsSent: order.orderIsSent,
                })
              }
            >
              Zaakceptuj
            </Button>
            <Button
              onClick={() =>
                setNewOrder({
                  ...newOrder,
                  id: order.id,
                  orderIsSent: true,
                  orderIsAccepted: order.orderIsAccepted,
                })
              }
            >
              Wyślij
            </Button>
          </StyledLineWrapper>
        </StyledOrderWrapper>
      ))}
    </StyledOrderListWrapper>
  );
};

export default OrderList;
