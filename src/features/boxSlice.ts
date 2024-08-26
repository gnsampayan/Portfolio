// src/features/boxSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BoxState {
  id: number;
  x: string;
  y: string;
  opacity: number;
  transitioning: boolean;
  clickable: boolean;
  xCoord: string;
  yCoord: string;
  animate: boolean;
}

const initialState: BoxState[] = [
  { id: 1, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
  { id: 2, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
  { id: 3, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
  { id: 4, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
  { id: 5, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
  { id: 6, x: '0', y: '0', opacity: 0, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
  { id: 7, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' }, 
  { id: 8, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
  { id: 9, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
  { id: 10, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
  { id: 11, x: '0', y: '0', opacity: 1, animate: false, transitioning: false, clickable: true, xCoord: '0', yCoord: '0' },
];

const boxSlice = createSlice({
  name: 'boxes',
  initialState,
  reducers: {
    moveBox: (state, action: PayloadAction<{ id: number; x: string; y: string }>) => {
      const box = state.find((b) => b.id === action.payload.id);
      if (box) {
        box.x = action.payload.x;
        box.y = action.payload.y;
        box.transitioning = true;
      }
    },
    setOpacity: (state, action: PayloadAction<{ id: number; opacity: number }>) => {
      const box = state.find((b) => b.id === action.payload.id);
      if (box) {
        box.opacity = action.payload.opacity;
      }
    },
    endTransition: (state, action: PayloadAction<{ id: number }>) => {
      const box = state.find((b) => b.id === action.payload.id);
      if (box) {
        box.transitioning = false;
      }
    },
    toggleClickable: (state, action: PayloadAction<{ id: number; clickable: boolean }>) => {
      const box = state.find((b) => b.id === action.payload.id);
      if (box) {
        box.clickable = action.payload.clickable;
      }
    },
    updateCoords: (state, action: PayloadAction<{ id: number; xCoord: string; yCoord: string }>) => {
      const box = state.find((b) => b.id === action.payload.id);
      if (box) {
        box.xCoord = action.payload.xCoord;
        box.yCoord = action.payload.yCoord;
      }
    },
    toggleTransition: (state, action: PayloadAction<{ id: number; animate: boolean }>) => {
      const box = state.find((b) => b.id === action.payload.id);
      if (box) {
        box.animate = action.payload.animate;
      }
    },
    reset: (state, action: PayloadAction<number[] | undefined>) => {
      if (action.payload) {
        // Reset only the boxes with the specified IDs
        action.payload.forEach((id) => {
          const box = state.find((b) => b.id === id);
          if (box) {
            const initialBox = initialState.find((b) => b.id === id);
            if (initialBox) {
              box.x = initialBox.x;
              box.y = initialBox.y;
              box.opacity = initialBox.opacity;
              box.animate = initialBox.animate;
              box.transitioning = initialBox.transitioning;
              box.clickable = initialBox.clickable;
              box.xCoord = initialBox.xCoord;
              box.yCoord = initialBox.yCoord;
            }
          }
        });
      } else {
        // Reset all boxes if no specific IDs are provided
        return initialState;
      }
    },
  },
});

export const { moveBox, setOpacity, endTransition, toggleClickable, updateCoords, toggleTransition, reset } = boxSlice.actions;

export default boxSlice.reducer;
