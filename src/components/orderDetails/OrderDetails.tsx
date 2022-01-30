import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '@utils/axios/axios.interceptor';
import GenericTable, {
  GenericTableColumns,
  GenericTableRows,
} from '../table/Table';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import {
  OrderModel,
  PolishOrderVariables,
} from '@src/utils/models/order.model';
import {
  TranslateObjectColumns,
  TranslateObjectRows,
} from '@src/utils/genericTableObjectFunc/GenericTableObjectFunc';
import { PolishMenuItemsEnum } from '@src/utils/models/menuItems.model';

const StyledWrapper = styled.div`
  position: absolute;
  top: 60px;
  width: 100%;
  height: calc(100% - 60px);
  display: grid;
  grid-template-columns: 10% 1fr;
`;
const StyledTableContainer = styled.div`
  display: grid;
  grid-template-rows: 25% 25% 1fr;
`;
const StyledButton = styled(IconButton)`
  width: 100px;
  height: 80px;

  margin: 50% auto auto 50%;
  svg {
    height: 100%;
    width: 100%;
  }
`;
const StyledLink = styled(NavLink)`
  width: 100px;
  height: 80px;
  cursor: pointer;
  margin: 50% auto auto 50%;
  svg {
    height: 100%;
    width: 100%;
  }
`;
const StyledButtonsWrapper = styled.div`
  width: 50%;
  margin: 5% auto auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

interface Props {}
const OrderDetails: React.FC<Props> = ({}) => {
  const params = useParams();
  const [order, setOrder] = useState<OrderModel>({} as OrderModel);
  const [rows, setRows] = useState<GenericTableRows[]>([]);
  const [columns, setColumns] = useState<GenericTableColumns[]>([]);
  const [menuItemsRows, setMenuItemsRows] = useState<GenericTableRows[]>([]);
  const [menuItemsColumns, setMenuItemsColumns] = useState<
    GenericTableColumns[]
  >([]);
  const [isSend, setIsSend] = useState<boolean>();
  const [isAccepted, setIsAccepted] = useState<boolean>();
  useEffect(() => {
    api
      .get<OrderModel>(`orders/${params.id}`)
      .then((res) => {
        const order = res.data;
        setOrder(order);
        setIsAccepted(order.orderIsAccepted);
        setIsSend(order.orderIsSent);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const newOrder: any = {
      ...order,
      orderTotalPrice: `${order.orderTotalPrice} zł`,
    };
    delete newOrder['menuItems'];

    let newPolishVariables: any = PolishOrderVariables;
    delete newPolishVariables['menuItems'];
    newPolishVariables = { ...newPolishVariables };
    setColumns(TranslateObjectColumns(newPolishVariables));
    setRows(TranslateObjectRows([newOrder]));

    let menuItems: any = [];
    if (order && order.menuItems) {
      menuItems = order.menuItems;
    }

    menuItems = menuItems.map((menuItem: any) => {
      return { ...menuItem, menuItemPrice: `${menuItem.menuItemPrice} zł` };
    });
    setMenuItemsColumns(TranslateObjectColumns(PolishMenuItemsEnum));
    setMenuItemsRows(TranslateObjectRows(menuItems));
  }, [order]);

  useEffect(() => {
    if (
      order.orderIsAccepted !== isAccepted &&
      typeof isAccepted === 'boolean'
    ) {
      const newOrder: OrderModel = { ...order, orderIsAccepted: isAccepted };
      api
        .put('orders', newOrder)
        .then(() => {
          setOrder(newOrder);
        })
        .catch((err) => console.log(err));
    }
  }, [isAccepted]);
  useEffect(() => {
    if (order.orderIsSent !== isSend && typeof isSend === 'boolean') {
      const newOrder: OrderModel = { ...order, orderIsSent: isSend };
      api
        .put('orders', newOrder)
        .then(() => setOrder(newOrder))
        .catch((err) => console.log(err));
    }
  }, [isSend]);
  return (
    <StyledWrapper>
      <StyledLink to="../orders">
        <ArrowBackIcon></ArrowBackIcon>
      </StyledLink>

      <StyledTableContainer>
        <GenericTable tableRows={rows} columns={columns} />
        <GenericTable tableRows={menuItemsRows} columns={menuItemsColumns} />
        <StyledButtonsWrapper>
          <StyledButton
            disableFocusRipple={order.orderIsAccepted}
            disabled={order.orderIsAccepted}
            onClick={() => {
              if (!order.orderIsAccepted) setIsAccepted(true);
            }}
          >
            <CheckIcon> </CheckIcon>
            <span>Zaakceptuj</span>
          </StyledButton>
          <StyledButton
            disableFocusRipple={order.orderIsSent}
            disabled={order.orderIsSent}
            onClick={() => {
              if (order.orderIsAccepted && !order.orderIsSent) {
                setIsSend(true);
              }
            }}
          >
            <SendIcon></SendIcon>
            <span>Wyślij</span>
          </StyledButton>
        </StyledButtonsWrapper>
      </StyledTableContainer>
    </StyledWrapper>
  );
};
export default OrderDetails;
