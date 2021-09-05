import AppProviders from './utils/providers/AppProviders';
import { Route, Switch } from 'react-router-dom';
import Root from './views/root/Root';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import styled from 'styled-components';

function App() {
  const Wrapper = styled.main`
    position: absolute;
    top: 120px;
  `;
  return (
    <>
      <Header />
      <Navbar />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Root}></Route>
        </Switch>
      </Wrapper>
    </>
  );
}

export default App;
