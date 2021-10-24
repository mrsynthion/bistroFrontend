import { Redirect, Route, Switch } from 'react-router-dom';
import Root from './views/root/Root';
import Header from './components/header/Header';
import Register from './views/register/Register';
import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import MenuItems from './views/menuItems/MenuItems';

function App() {
  const userData = useSelector((state: any) => state.userData);
  return (
    <>
      <Header />

      <Paper
        component="main"
        sx={{
          minHeight: 'calc(100% - 60px)',
          width: '100%',
          position: 'absolute',
          top: '60px',
          backgroundColor: '#FFF9C4',
        }}
      >
        <Switch>
          <Route exact path="/" component={Root}></Route>
          <Route exact path="/order"></Route>
          {userData.userName ? (
            <Redirect exact path="/register" to="/" />
          ) : (
            <Route exact path="/register" component={Register} />
          )}
          <Route exact path="/menu" component={MenuItems} />
        </Switch>
      </Paper>
    </>
  );
}

export default App;
