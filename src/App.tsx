import { Redirect, Route, Switch } from 'react-router-dom';
import Root from './views/root/Root';
import Header from './components/header/Header';
import styled from 'styled-components';
import Register from './views/register/Register';

const Wrapper = styled.main`
  height: calc(100% - 60px);
  width: 100%;
  position: absolute;
  top: 60px;
  background-color: #90caf9;
`;

function App() {
  return (
    <>
      <Header />

      <Wrapper>
        <Switch>
          <Route exact path="/" component={Root}></Route>
          <Route exact path="/menu"></Route>
          <Route exact path="/additives"></Route>

          {
            <Route exact path="/register">
              {localStorage.getItem('userName') ? (
                <Redirect to="/" />
              ) : (
                <Register />
              )}
            </Route>
          }
        </Switch>
      </Wrapper>
    </>
  );
}

export default App;
