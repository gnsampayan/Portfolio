// src/components/Contexts/ControlPanelContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveBox, setOpacity, toggleClickable, updateCoords, toggleTransition, reset } from '../../features/boxSlice';

export interface ControlPanelContextProps {
  handleXCoordChange: (id: number, newXCoord: string) => void;
  handleYCoordChange: (id: number, newYCoord: string) => void;
//   handleMove: (id: number) => void;
    handleMove: (id: number, x: string, y: string) => void;
  changeOpacity: (id: number, opacity: number) => void;
  toggleClickability: (id: number) => void;
  boxInView: number;
  setBoxInView: React.Dispatch<React.SetStateAction<number>>;
  toggleAnimation: (id: number, animate: boolean) => void;
  handleReset: (ids?: number[]) => void;
}

const ControlPanelContext = createContext<ControlPanelContextProps | undefined>(undefined);

export const ControlPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const boxes = useSelector((state: any) => state.boxes); // Move useSelector outside of functions
  const [boxInView, setBoxInView] = useState<number>(-1);

  const handleXCoordChange = (id: number, newXCoord: string) => {
    const box = boxes.find((b: any) => b.id === id);
    if (box) {
      dispatch(updateCoords({ id, xCoord: newXCoord, yCoord: box.yCoord }));
    }
  };

  const handleYCoordChange = (id: number, newYCoord: string) => {
    const box = boxes.find((b: any) => b.id === id);
    if (box) {
      dispatch(updateCoords({ id, xCoord: box.xCoord, yCoord: newYCoord }));
    }
  };

//   const handleMove = (id: number) => {
//     const box = boxes.find((b: any) => b.id === id);
//     if (box) {
//       dispatch(moveBox({ id, x: `${box.xCoord}vw`, y: `${box.yCoord}vh` }));
//     }
//   };

    const handleMove = (id: number, xCoord: string, yCoord: string) => {
        const box = boxes.find((b: any) => b.id === id);
        if (box) {
            dispatch(moveBox({ id, x: `${xCoord}`, y: `${yCoord}` }));
        }
    };

    const changeOpacity = (id: number, opacity: number) => {
        dispatch(setOpacity({ id, opacity }));
    };

    const toggleClickability = (id: number) => {
        const box = boxes.find((b: any) => b.id === id);
        if (box) {
        dispatch(toggleClickable({ id, clickable: !box.clickable }));
        }
    };

    const toggleAnimation = (id: number, animate: boolean) => {
        const box = boxes.find((b: any) => b.id === id);
        if (box) {
            dispatch(toggleTransition({ id, animate })); // Directly set the animate value
        }
    };
    const handleReset = (ids?: number[]) => {
        dispatch(reset(ids)); // Pass the IDs to the reset action
    };


  return (
    <ControlPanelContext.Provider
      value={{
        handleXCoordChange,
        handleYCoordChange,
        handleMove,
        changeOpacity,
        toggleClickability,
        boxInView,
        setBoxInView,
        toggleAnimation,
        handleReset,
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
};

export const useControlPanel = (): ControlPanelContextProps => {
  const context = useContext(ControlPanelContext);
  if (!context) {
    throw new Error('useControlPanel must be used within a ControlPanelProvider');
  }
  return context;
};
