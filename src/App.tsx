import { ThemeProvider } from 'styled-components';
import { theme } from '@theme/theme';
import GlobalStyle from './globalStyle';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Root from './views/root/Root';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Root}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
