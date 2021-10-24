import { MenuItemsModel } from "./menuItems.model";

interface AddressModel{

}

export interface OrderModel {
    orderUserUsername:string,
    orderMenuItems: Array<MenuItemsModel>,
    orderTotalPrice:number,
    orderPlaceToOrder:string,
    orderIsSent:boolean,
    orderIsAccepted:boolean,
    orderUserId:number | null
}
