import { Route, Switch } from 'react-router-dom';
import Root from './views/root/Root';
import Header from './components/header/Header';
import styled from 'styled-components';

const Wrapper = styled.main`
  position: absolute;
  top: 60px;
  width: 100%;
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
        </Switch>
      </Wrapper>
    </>
  );
}

export default App;
