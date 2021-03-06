export interface UserModel {
  id: number;
  userName: string;
  userLastName: string;
  userCity: string;
  userAdressStreetName: string;
  userAdressStreetNumber: string;
  userAdressHomeNumber: string;
  userPhoneNumber?: string;
  userUsername: string;
  userPassword?: string;
  userType?: string;
}

export enum EnglishVariables {
  id = 'id',
  userName = 'userName',
  userLastName = 'userLastName',
  userCity = 'userCity',
  userAdressStreetName = 'userAdressStreetName',
  userAdressStreetNumber = 'userAdressStreetNumber',
  userAdressHomeNumber = 'userAdressHomeNumber',
  userPhoneNumber = 'userPhoneNumber',
  userUsername = 'userUsername',
  userPassword = 'userPassword',
  userType = 'userType',
}
export type UserVariablesNames =
  | 'id'
  | 'userName'
  | 'userLastName'
  | 'userCity'
  | 'userAdressStreetName'
  | 'userAdressStreetNumber'
  | 'userAdressHomeNumber'
  | 'userPhoneNumber'
  | 'userUsername';
export enum PolishVariables {
  id = 'Id',
  userName = 'Imię',
  userLastName = 'Nazwisko',
  userCity = 'Miasto',
  userAdressStreetName = 'Nazwa ulicy',
  userAdressStreetNumber = 'Numer ulicy',
  userAdressHomeNumber = 'Numer domu',
  userPhoneNumber = 'Numer telefonu',
  userUsername = 'Nazwa uzytkownika',
  userPassword = 'Hasło',
  userType = 'Typ uzytkownika',
}
export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PERSONEL = 'PERSONEL',
}
