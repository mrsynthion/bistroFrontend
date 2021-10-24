import { configureStore } from "@reduxjs/toolkit";
import {menuItemsApi } from "./menuStore/menuSlice";
import { typesApi } from "./menuStore/typesSlice";
import { userSlice } from "./userDataStore/userSlice";

export const store = configureStore({
    reducer: {
      userData:userSlice.reducer,
      [menuItemsApi.reducerPath]:menuItemsApi.reducer,
      [typesApi.reducerPath]:typesApi.reducer
    }
  })
