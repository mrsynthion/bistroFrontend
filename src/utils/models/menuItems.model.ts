export interface MenuItemsModel {
  id: number;
  menuItemName: string;
  menuItemCategory: string;
  menuItemDescription: string;
  menuItemPrice: number;
}
export enum PolishMenuItemsEnum {
  id = 'Id',
  menuItemName = 'Nazwa',
  menuItemCategory = 'Kategoria',
  menuItemDescription = 'Opis dania',
  menuItemPrice = 'Cena',
}
