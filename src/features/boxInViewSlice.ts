// src/features/boxInViewSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BoxInViewState {
  boxInView: number;
}

const initialState: BoxInViewState = {
  boxInView: -1, // Default value
};

const boxInViewSlice = createSlice({
  name: 'boxInView',
  initialState,
  reducers: {
    setBoxInView: (state, action: PayloadAction<number>) => {
      state.boxInView = action.payload;
    },
  },
});

export const { setBoxInView } = boxInViewSlice.actions;

export default boxInViewSlice.reducer;
