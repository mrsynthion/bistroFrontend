import { MenuItemsModel } from './menuItems.model';

interface AddressModel {}

export interface OrderModel {
  orderMenuItems: Array<MenuItemsModel>;
  orderTotalPrice: number;
  orderPlaceToOrder: string;
  orderIsSent: boolean;
  orderIsAccepted: boolean;
  orderUserId: number | null;
  orderUserName: string;
  orderUserLastName: string;
  orderUserPhoneNumber: string;
}
