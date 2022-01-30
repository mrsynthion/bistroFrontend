import { Route, Routes } from 'react-router-dom';
import Root from './views/root/Root';
import Header from './components/header/Header';
import Register from './views/register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import MenuItems from './views/menuItems/MenuItems';
import MakeOrder from './components/makeOrder/makeOrder';
import UserDataView from './views/userData/UserData';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import AdminPanel from './views/adminPanel/AdminPanel';
import api from '@utils/axios/axios.interceptor';
import { useEffect, useState } from 'react';
import { setUserData } from './store/userDataStore/userSlice';
import { UserModel, UserType } from './utils/models/user.model';
import { AppState } from './store';
import UserList from './views/userList/UserList';
import OrderList from './views/orderList/OrderList';
import OrderDetails from './components/orderDetails/OrderDetails';
import TablesView from './views/tables/Tables';

function App() {
  const dispatch = useDispatch();
  const [userData, setLocalUserData] = useState<UserModel | null>();
  const selectedUserData = useSelector((state: AppState) => state.userData);
  useEffect(() => {
    if (localStorage.getItem('logged')) {
      api
        .get('users/data')
        .then((response) => {
          dispatch(setUserData(response.data));
          setLocalUserData(response.data);
        })
        .catch((error) => {
          setLocalUserData(null);
        });
    } else {
      setLocalUserData(null);
    }
  }, []);
  return userData === undefined ? null : (
    <>
      <Header />

      <Paper
        component="main"
        sx={{
          minHeight: 'calc(100% - 60px)',
          height: 'auto',
          width: '100%',
          position: 'absolute',
          top: '60px',
          backgroundColor: '#FFF9C4',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <Routes>
          <Route path="/" element={<Root />}></Route>
          <Route path="/makeOrder" element={<MakeOrder />}></Route>

          <Route
            path="/register"
            element={
              <PrivateRoute
                auth={!userData?.userName || !selectedUserData.userUsername}
              />
            }
          >
            <Route path="" element={<Register isAdminPanel={false} />} />
          </Route>

          <Route path="/menu" element={<MenuItems />} />
          <Route path="/tables" element={<TablesView />} />
          <Route path="/user" element={<UserDataView />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute
                auth={
                  userData?.userType === UserType.ADMIN ||
                  userData?.userType === UserType.PERSONEL ||
                  selectedUserData.userType === UserType.ADMIN ||
                  selectedUserData.userType === UserType.PERSONEL
                }
              />
            }
          >
            <Route path="" element={<AdminPanel />}>
              <Route path="users" element={<UserList />} />
              <Route path="orders" element={<OrderList />} />
              <Route path="order/:id" element={<OrderDetails />} />
              <Route
                path="users/newUser"
                element={<Register isAdminPanel={true} />}
              />
            </Route>
          </Route>
        </Routes>
      </Paper>
    </>
  );
}

export default App;
