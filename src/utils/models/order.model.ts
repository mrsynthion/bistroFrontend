import { MenuItemsModel } from './menuItems.model';

export interface OrderModel {
  menuItems: Array<MenuItemsModel>;
  id?: number;
  orderTotalPrice: number;
  orderPlaceToOrder: string;
  orderIsSent: boolean;
  orderIsAccepted: boolean;
  orderUserId: number | null;
  orderUserName: string;
  orderUserLastName: string;
  orderUserPhoneNumber: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export enum EnglishOrderVariables {
  menuItems = 'menuItems',
  orderUserId = 'orderUserId',
  orderUserName = 'orderUserName',
  orderUserLastName = 'orderUserLastName',
  orderUserPhoneNumber = 'orderUserPhoneNumber',
  orderTotalPrice = 'orderTotalPrice',
  orderPlaceToOrder = 'orderPlaceToOrder',
  orderIsAccepted = 'orderIsAccepted',
  orderIsSent = 'orderIsSent',
}

export enum PolishOrderVariables {
  menuItems = 'Lista ',
  orderUserId = 'Id',
  orderUserName = 'Imię',
  orderUserLastName = 'Nazwisko',
  orderUserPhoneNumber = 'Numer telefonu',
  orderTotalPrice = 'Cena',
  orderPlaceToOrder = 'Adress',
  orderIsAccepted = 'Zaakceptowane',
  orderIsSent = 'Wysłane?',
}
