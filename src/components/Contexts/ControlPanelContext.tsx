// src/components/Contexts/ControlPanelContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveBox, setOpacity, toggleClickable, updateCoords, toggleTransition, reset } from '../../features/boxSlice';
import { RootState } from '../../reducers/index';
import { setBoxInView as setBoxInViewAction } from '../../features/boxInViewSlice';

export interface ControlPanelContextProps {
  handleXCoordChange: (id: number, newXCoord: string) => void;
  handleYCoordChange: (id: number, newYCoord: string) => void;
  handleMove: (id: number, x: string, y: string) => void;
  changeOpacity: (id: number, opacity: number) => void;
  toggleClickability: (id: number, isClickable: boolean) => void;
  boxInView: number;
  setBoxInView: (id: number) => void;
  toggleAnimation: (id: number, animate: boolean) => void;
  handleReset: (ids?: number[]) => void;
}

const ControlPanelContext = createContext<ControlPanelContextProps | undefined>(undefined);

export const ControlPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const boxes = useSelector((state: any) => state.boxes); // Move useSelector outside of functions
  const boxInView = useSelector((state: RootState) => state.boxInView.boxInView);

  // Load boxInView from local storage on initialization
  useEffect(() => {
    const savedBoxInView = localStorage.getItem('boxInView');
    if (savedBoxInView !== null) {
      dispatch(setBoxInViewAction(parseInt(savedBoxInView, 10)));
    }
  }, [dispatch]);

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

  const handleMove = (id: number, xCoord: string, yCoord: string) => {
    const box = boxes.find((b: any) => b.id === id);
    if (box) {
      dispatch(moveBox({ id, x: `${xCoord}`, y: `${yCoord}` }));
    }
  };

  const changeOpacity = (id: number, opacity: number) => {
    dispatch(setOpacity({ id, opacity }));
  };

  const toggleClickability = (id: number, isClickable: boolean) => {
    const box = boxes.find((b: any) => b.id === id);
    if (box) {
      dispatch(toggleClickable({ id, clickable: isClickable }));
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

  // Update boxInView and save it to local storage
  const setBoxInView = (id: number) => {
    dispatch(setBoxInViewAction(id));
    localStorage.setItem('boxInView', id.toString());
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
