import {  createSlice } from "@reduxjs/toolkit";
import { MenuItemsModel } from "@src/utils/models/menuItems.model";
import { OrderModel } from "@src/utils/models/order.model";



const initialOrderState : OrderModel =  {
  orderUserUsername:'',
  orderUserId:null,
  orderIsAccepted:false,
  orderIsSent:false,
  orderMenuItems:[],
  orderPlaceToOrder:'',
  orderTotalPrice:0
}



export const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    addOrderMenuITem(state:any,action){
        state.orderMenuItems.push(
          {...action.payload,index:state.orderMenuItems.length})
    },
    removeOrderMenuITem(state,action){
      return {...state,
        orderMenuItems:state.orderMenuItems.filter(
          (item:any)=> item.index !==action.payload.index)}
    },
    setOrderData(state,action){
        return {
             ...state,
            orderPlaceToOrder:action.payload.orderPlaceToOrder,
            orderTotalPrice:action.payload.orderTotalPrice,
            orderUserId:action.payload.orderUserId,
            orderUserUsername:action.payload.orderUserUsername}
    }
  },
});

export const {addOrderMenuITem,removeOrderMenuITem,setOrderData} = orderSlice.actions


