import { configureStore } from '@reduxjs/toolkit';
import { menuItemsApi } from './menuStore/menuSlice';
import { typesApi } from './menuStore/typesSlice';
import { orderSlice } from './orderStore/orderSlice';
import { userSlice } from './userDataStore/userSlice';

export const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    [menuItemsApi.reducerPath]: menuItemsApi.reducer,
    [typesApi.reducerPath]: typesApi.reducer,
    orderData: orderSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
