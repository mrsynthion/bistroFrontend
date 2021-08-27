export interface Order {
    orderUserUsername:string,
    orderMenuItemsId: Array<number>,
    orderTotalPrice:number,
    orderPlaceToOrder:string,
    orderIsSent:boolean,
    orderIsAccepted:boolean
}
