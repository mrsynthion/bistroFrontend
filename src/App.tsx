import styled from 'styled-components';
import SignIn from './views/SignIn/SignIn';

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  background-color: darkgrey;
  width: 100%;
  height: 99vh;
  border: none;
`;
function App() {
  return (
    <Wrapper>
      <SignIn />
    </Wrapper>
  );
}

export default App;
