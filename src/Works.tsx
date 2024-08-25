import styled from 'styled-components';
import DesignRunOrg from './components/Folds/DesignRunOrg';
import Spanning from './components/Folds/Spanning';
import WeAreHere from './components/Folds/WeAreHere';
import NQHardware from './components/Folds/NQHardware';
import DesignRunGroup from './components/Folds/DesignRunGroup';
import NQHardwareDetails from './components/ProjectDetails/NQHardwareDetails';
import DrgGroupDetails from './components/ProjectDetails/DrgGroupDetails';
import WeAreHereDetails from './components/ProjectDetails/WeAreHereDetails';
import DrgOrgDetails from './components/ProjectDetails/DrgOrgDetails';
import SpanningDetails from './components/ProjectDetails/SpanningDetails';
import { useNavContext } from './components/Contexts/NavContext';
import { useEffect, useRef } from 'react';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  overflow: hidden;
`;

const Folds = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;
const Fold = styled.div<{ leftValue: string; foldVis: boolean}>`
  display: ${(props) => props.foldVis ? "flex" : "none"};
  width: 100vw;
  padding-left: 360px;
  left: ${(props) => props.leftValue};
  transition: left 1s ease;
  position: relative;
`;
const Details = styled.div`
  position: absolute;
  top: 0;
  left: 360px;
  overflow: auto;
`;

const Works = () => {

  const { 
    foldTranslation,
    highlightedSecondaryNav,
    setHighlightedSecondaryNav,
    visibleProject,
    touchedFolds,
    foldVis,
    isScrollEnabled,
  } = useNavContext();
  const foldsRef = useRef<HTMLDivElement[]>([]);
  

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isScrollEnabled && highlightedSecondaryNav !== null) {
        if (event.deltaY > 0 && highlightedSecondaryNav < foldsRef.current.length - 1) {
          // Scroll down
          setHighlightedSecondaryNav(highlightedSecondaryNav + 1);
        } else if (event.deltaY < 0 && highlightedSecondaryNav > 0) {
          // Scroll up
          setHighlightedSecondaryNav(highlightedSecondaryNav - 1);
        }
      }
    };
  
    window.addEventListener('wheel', handleScroll);
  
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [highlightedSecondaryNav, setHighlightedSecondaryNav, isScrollEnabled]);
  
  // Scroll to the highlighted fold when highlightedSecondaryNav changes
useEffect(() => {
  if (highlightedSecondaryNav !== null && foldsRef.current[highlightedSecondaryNav]) {
    if (isScrollEnabled) {
      foldsRef.current[highlightedSecondaryNav].scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("Scroll attempt blocked because isScrollEnabled is false");
    }
  }
}, [highlightedSecondaryNav, isScrollEnabled]);
  
  
  return (
    <Wrapper>
      <Folds >
        <Fold  
          ref={(el) => foldsRef.current[0] = el!} 
          leftValue={touchedFolds?.includes(0) ? foldTranslation : '100vw'}
          foldVis={touchedFolds?.includes(0) ? foldVis : true}>
            <NQHardware />
        </Fold>
        <Fold  
          ref={(el) => foldsRef.current[1] = el!}
          leftValue={touchedFolds?.includes(1) ? foldTranslation : '100vw'}
          foldVis={touchedFolds?.includes(1) ? foldVis : true}>
            <DesignRunGroup />
        </Fold>
        <Fold  
          ref={(el) => foldsRef.current[2] = el!}
          leftValue={touchedFolds?.includes(2) ? foldTranslation : '100vw'}
          foldVis={touchedFolds?.includes(2) ? foldVis : true}>
            <WeAreHere />
        </Fold>
        <Fold  
          ref={(el) => foldsRef.current[3] = el!}
          leftValue={touchedFolds?.includes(3) ? foldTranslation : '100vw'}
          foldVis={touchedFolds?.includes(3) ? foldVis : true}>
            <DesignRunOrg />
        </Fold>
        <Fold  
          ref={(el) => foldsRef.current[4] = el!}
          leftValue={touchedFolds?.includes(4) ? foldTranslation : '100vw'}
          foldVis={touchedFolds?.includes(4) ? foldVis : true}>
            <Spanning />
        </Fold>
      </Folds>
      <Details>
        <NQHardwareDetails visible={visibleProject === 0} />
        <DrgGroupDetails visible={visibleProject === 1} />
        <WeAreHereDetails visible={visibleProject === 2} />
        <DrgOrgDetails visible={visibleProject === 3} />
        <SpanningDetails visible={visibleProject === 4} />
      </Details>
    </Wrapper>
  );
};

export default Works;
