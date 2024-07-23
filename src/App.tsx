import styled from 'styled-components';
import { useEffect, useState } from 'react';
import DynamicNav from './components/dynamic-nav';
import Works from './Works';
import Background from '../src/assets/background.png';
import Orbital from './components/orbital';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.5; /* Adjust this value to change opacity */
    z-index: -1;
  }
`

const App = () => {

  const [gridTranslation, setGridTranslation] = useState<string>('100vw');
  const [btn, setBtn] = useState<string | null>(null);
  const [visState, setVis] = useState<string>('hidden');

  const handleTranslationChange = (direction: string) => {
    const directionTranslations: { [key: string]: string } = {
      left: '170px',
      center: '100vw',
    };

    setGridTranslation(directionTranslations[direction] || '100vw');
  };

  const handleObjectVis = (activeNav: string | null) => {
    if (activeNav === "Design") {
      setVis('visible');
    } else {
      setVis('hidden');
    }
  };
  useEffect(() => {
    return handleObjectVis(btn);
  }, [btn]);

  return (
    <Wrapper>
      <DynamicNav 
        onMove={handleTranslationChange}
        activeButton={btn}
        setActiveButton={setBtn}>
        </DynamicNav>
      <Works vis={visState} translation={gridTranslation}></Works>
      <Orbital/>
    </Wrapper>
  )
}

export default App
