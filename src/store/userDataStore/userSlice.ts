import { UserModel } from '@src/utils/models/user.model';
import { createSlice } from '@reduxjs/toolkit';

const initialUserState: UserModel = {
  id: 0,
  userName: '',
  userLastName: '',
  userAdressStreetName: '',
  userAdressStreetNumber: '',
  userAdressHomeNumber: '',
  userCity: '',
  userUsername: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserData: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setUserData } = userSlice.actions;
