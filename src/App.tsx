import styled from 'styled-components';
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
import OtherWorks from './components/OtherWorks';
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
`;
const ProjectFoldsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 100vw;
  z-index: 99;
`;
const ProjectDetailsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 100dvh;
  left: 0;
`;
const DynamicNavWrapper = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  top: calc(50dvh - 200px);
  left: calc(50vw - 160px);
  z-index: 999;
  @media only screen and (max-width: 1250px) {
    top: calc(50dvh - 150px);
    left: calc(50vw - 110px);
	}
  @media only screen and (max-width: 768px) {
    position: sticky;
    top: 0;
	}
`;
const AboutMeWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100vw;
`;

const App = () => {
  const componentMapping = [
    //Folds
    <NQHardware />,
    <DesignRunGroup />,
    <WeAreHere />,
    <DesignRunOrg />,
    <Spanning />,
    //Deails
    <NQHardwareDetails />,
    <DrgGroupDetails />,
    <WeAreHereDetails />,
    <DrgOrgDetails />,
    <SpanningDetails />,
    //Nav
    <DynamicNav />,
    <AboutMe />,
  ]

  return (
    <Wrapper>
      {/* Project Folds */}
      <ProjectFoldsWrapper>
        {[1, 2, 3, 4, 5].map((id) => (
          <Box key={id} id={id} childComponent={componentMapping[id - 1]} />
        ))}
      </ProjectFoldsWrapper>
      {/* Project Details Pages */}
      <ProjectDetailsWrapper>
        {[6, 7, 8, 9, 10].map((id) => (
          <Box key={id} id={id} childComponent={componentMapping[id - 1]} />
        ))}
      </ProjectDetailsWrapper>
      {/* Dynamic Nav Box */}
      <DynamicNavWrapper>
        <Box key={11} id={11} childComponent={componentMapping[10]} />
      </DynamicNavWrapper>
      {/* About Me Page */}
      <AboutMeWrapper>
        <Box key={12} id={12} childComponent={componentMapping[11]} />
      </AboutMeWrapper>
      <OtherWorks />
    </Wrapper>
  );
};

export default App;
