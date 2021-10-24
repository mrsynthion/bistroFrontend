import { MenuItemsModel } from "./menuItems.model";

export interface OrderModel {
    orderUserUsername:string,
    orderMenuItems: Array<MenuItemsModel>,
    orderTotalPrice:number,
    orderPlaceToOrder:string,
    orderIsSent:boolean,
    orderIsAccepted:boolean
}
