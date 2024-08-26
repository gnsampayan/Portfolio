import styled from 'styled-components';
import Orbital from './components/orbital';
import Box from './components/Box';
//child components - Folds
import NQHardware from './components/Folds/NQHardware';
import DesignRunGroup from './components/Folds/DesignRunGroup';
import WeAreHere from './components/Folds/WeAreHere';
import DesignRunOrg from './components/Folds/DesignRunOrg';
import Spanning from './components/Folds/Spanning';
//child components - Details
import NQHardwareDetails from './components/ProjectDetails/NQHardwareDetails';
import DrgGroupDetails from './components/ProjectDetails/DrgGroupDetails';
import WeAreHereDetails from './components/ProjectDetails/WeAreHereDetails';
import DrgOrgDetails from './components/ProjectDetails/DrgOrgDetails';
import SpanningDetails from './components/ProjectDetails/SpanningDetails';
//Dynamic Nav
import DynamicNav from './components/dynamic-nav';
//AboutMe
import AboutMe from './components/AboutMe';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
const BoxGroup1To5Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 100vw;
  z-index: 99;
`;
const BoxGroup6To10Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 100vh;
  left: 0;
`;
const BoxGroup11Wrapper = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  top: calc(50vh - 200px);
  left: calc(50vw - 160px);
  z-index: 999;
`;
const BoxGroup12Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100vw;
`;

const App = () => {
  const componentMapping = [
    //Folds
    <NQHardware/>,
    <DesignRunGroup/>,
    <WeAreHere/>,
    <DesignRunOrg/>,
    <Spanning/>,
    //Deails
    <NQHardwareDetails/>,
    <DrgGroupDetails/>,
    <WeAreHereDetails/>,
    <DrgOrgDetails/>,
    <SpanningDetails/>,
    //Nav
    <DynamicNav />,
    <AboutMe />
  ]
  return (
    <Wrapper>
      <Orbital />
        {/* Render boxes 1-10 in one group */}
        <BoxGroup1To5Wrapper>
          {[1, 2, 3, 4, 5].map((id) => (
            <Box key={id} id={id} childComponent={componentMapping[id - 1]} />
          ))}
        </BoxGroup1To5Wrapper>
        {/* Render boxes 6-10 in another group */}
        <BoxGroup6To10Wrapper>
          {[6, 7, 8, 9, 10].map((id) => (
            <Box key={id} id={id} childComponent={componentMapping[id - 1]} />
          ))}
        </BoxGroup6To10Wrapper>
        {/* Render box 11 in a separate div */}
        <BoxGroup11Wrapper>
          <Box key={11} id={11} childComponent={componentMapping[10]} />
        </BoxGroup11Wrapper>
        <BoxGroup12Wrapper>
          <Box key={12} id={12} childComponent={componentMapping[11]} />
        </BoxGroup12Wrapper>
    </Wrapper>
  );
};

export default App;
