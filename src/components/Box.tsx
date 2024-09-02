// src/components/Box.tsx
import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { endTransition } from '../features/boxSlice';
import styled from 'styled-components';

const BoxFrame = styled.div<{ x: string; y: string; opacity: number; $clickable: boolean; $animate: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  transform: ${({ x, y }) => `translate(${x}, ${y})`};
  opacity: ${({ opacity }) => opacity};
  transition: ${(props) => props.$animate ? 'transform 1s ease' : 'none'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ $clickable }) => ($clickable ? 'auto' : 'none')}; // Disable or enable interaction
  overflow: hidden;
`;
const Children = styled.div`
  position: relative;
`

interface BoxProps {
  id: number;
  childComponent: ReactNode;
}

const Box: React.FC<BoxProps> = ({ id, childComponent }) => {
  const dispatch = useDispatch();
  const box = useSelector((state: any) => state.boxes.find((b: any) => b.id === id));

  useEffect(() => {
    const handleTransitionEnd = () => {
      dispatch(endTransition({ id }));
    };

    const element = document.getElementById(`box-${id}`);
    if (element) {
      element.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [dispatch, id]);

  if (!box) {
    return null;
  }

  return (
    <BoxFrame
      id={`box-${id}`}
      x={box.x}
      y={box.y}
      opacity={box.opacity}
      $clickable={box.clickable}
      $animate={box.animate}
    >
      <Children>{childComponent}</Children>
    </BoxFrame>
  );
};


export default Box;
