import { createSlice } from '@reduxjs/toolkit';
import { OrderModel } from '@src/utils/models/order.model';

const initialOrderState: OrderModel = {
  orderUserId: null,
  orderIsAccepted: false,
  orderIsSent: false,
  orderMenuItems: [],
  orderPlaceToOrder: '',
  orderTotalPrice: 0,
  orderUserLastName: '',
  orderUserName: '',
  orderUserPhoneNumber: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    addOrderMenuItem(state: any, action) {
      return {
        ...state,
        orderMenuItems: [
          ...state.orderMenuItems,
          { ...action.payload, index: state.orderMenuItems.length },
        ],
        orderTotalPrice: state.orderTotalPrice + action.payload.menuItemPrice,
      };
    },
    removeOrderMenuItem(state, action) {
      return {
        ...state,
        orderMenuItems: state.orderMenuItems.filter(
          (item: any) => item.index !== action.payload.index
        ),
      };
    },
    setOrderData(state, action) {
      return {
        ...state,
        orderPlaceToOrder: action.payload.orderPlaceToOrder,
        orderTotalPrice: action.payload.orderTotalPrice,
        orderUserId: action.payload.orderUserId,
        orderUserUsername: action.payload.orderUserUsername,
      };
    },
  },
});

export const { addOrderMenuItem, removeOrderMenuItem, setOrderData } =
  orderSlice.actions;
