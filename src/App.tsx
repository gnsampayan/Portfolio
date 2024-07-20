import { useState } from 'react';
import DynamicNav from './components/dynamic-nav'
import Works from './Works'


function App() {

  const [gridTranslation, setGridTranslation] = useState<string>('100vw');

  const handleTranslationChange = (direction: string) => {
    const directionTranslations: { [key: string]: string } = {
      left: '170px',
      center: '100vw',
    };

    setGridTranslation(directionTranslations[direction] || '100vw');
  };

  return (
    <>
      <DynamicNav onMove={handleTranslationChange}></DynamicNav>
      <Works translation={gridTranslation}></Works>
    </>
  )
}

export default App
