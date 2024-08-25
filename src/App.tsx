import styled from 'styled-components';
import DynamicNav from './components/dynamic-nav';
import Works from './Works';
import Orbital from './components/orbital';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const App = () => {
  return (
    <Wrapper>
      <DynamicNav />
      <Works />
      <Orbital/>
    </Wrapper>
  );
}

export default App;
