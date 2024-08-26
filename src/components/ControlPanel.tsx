// src/components/ControlPanel.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveBox, setOpacity, toggleClickable, updateCoords } from '../features/boxSlice';

interface ControlPanelProps {
  id: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ id }) => {
  const dispatch = useDispatch();
  const box = useSelector((state: any) => state.boxes.find((b: any) => b.id === id));

  const handleXCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newXCoord = e.target.value;
    dispatch(updateCoords({ id, xCoord: newXCoord, yCoord: box.yCoord }));
  };

  const handleYCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYCoord = e.target.value;
    dispatch(updateCoords({ id, xCoord: box.xCoord, yCoord: newYCoord }));
  };

  const handleMove = () => {
    dispatch(moveBox({ id, x: `${box.xCoord}vw`, y: `${box.yCoord}vh` }));
  };

  const changeOpacity = (opacity: number) => {
    dispatch(setOpacity({ id, opacity }));
  };

  const toggleClickability = () => {
    if (box) {
      dispatch(toggleClickable({ id, clickable: !box.clickable }));
    }
  };

  return (
    <div>
      <h3>Controls for Box {id}</h3>
      <div>
        <label>
          X Coordinate:
          <input
            type="number"
            value={box.xCoord}
            onChange={handleXCoordChange}
            placeholder="e.g., 0"
          />
        </label>
      </div>
      <div>
        <label>
          Y Coordinate:
          <input
            type="number"
            value={box.yCoord}
            onChange={handleYCoordChange}
            placeholder="e.g., 0"
          />
        </label>
      </div>
      <button onClick={handleMove}>Move Box</button>
      <button onClick={() => changeOpacity(0)}>Set Opacity to 0</button>
      <button onClick={() => changeOpacity(1)}>Set Opacity to 1</button>
      <button onClick={toggleClickability}>
        {box?.clickable ? 'Disable Click' : 'Enable Click'}
      </button>
    </div>
  );
};

export default ControlPanel;
