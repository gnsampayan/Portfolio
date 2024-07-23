import React, { useEffect, useRef, useState } from 'react';
import './orbital.css';
import RandomObjectMover from './randomObjectMover';

const Orbital: React.FC = () => {
  const orbitalRef = useRef<HTMLDivElement>(null);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    if (orbitalRef.current) {
      const mover = new RandomObjectMover(orbitalRef.current, window);
      mover.start();
      return () => {
        mover.stop();
      };
    }
  }, []);

  const toggleNight = () => {
    if(!isNight) {
        document.body.classList.remove('night-mode');
    } else {
        document.body.classList.add('night-mode');
    }
  };

  return (
    <>
        <div id="orbital" ref={orbitalRef}>
            <div className="orbital-container">
                <div className="planets sun">
                    <div className="one ring"></div>
                    <div className="three">
                        <div className="ring"></div>
                        <div className="four"></div>
                    </div>
                    <div className="three slow">
                        <div className="ring"></div>
                        <div className="five"></div>
                    </div>
                    <div className="three fast">
                        <div className="ring"></div>
                        <div className="six"></div>
                    </div>
                </div>
                <div className={`planets sun sun-fast ${toggleNight()}`}>
                    <div className="sunoverlay" onClick={() => setIsNight(!isNight)}></div>
                    <div className="two">
                        <div className="ring"></div>
                        <div className="seven"></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Orbital;
