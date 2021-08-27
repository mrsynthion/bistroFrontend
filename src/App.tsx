import { ThemeProvider } from 'styled-components';
import { theme } from '@theme/theme';
import GlobalStyle from './globalStyle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <h1>siema</h1>
    </ThemeProvider>
  );
}

export default App;
