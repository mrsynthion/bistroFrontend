import { createSlice } from '@reduxjs/toolkit';
import { OrderModel } from '@src/utils/models/order.model';

const initialOrderState: OrderModel = {
  id: 0,
  orderUserId: null,
  orderIsAccepted: false,
  orderIsSent: false,
  menuItems: [],
  orderPlaceToOrder: '',
  orderTotalPrice: 0,
  orderUserLastName: '',
  orderUserName: '',
  orderUserPhoneNumber: '',
  createdAt: '',
  updatedAt: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    addOrderMenuItem(state: any, action) {
      return {
        ...state,
        menuItems: [
          ...state.menuItems,
          { ...action.payload, index: state.menuItems.length },
        ],
        orderTotalPrice: state.orderTotalPrice + action.payload.menuItemPrice,
      };
    },
    removeOrderMenuItem(state, action) {
      return {
        ...state,
        menuItems: state?.menuItems?.filter(
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
