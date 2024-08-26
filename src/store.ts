// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { loadState, saveState } from './utils/localStorage';

const preloadedState = loadState(); // Load the state from local storage

const store = configureStore({
  reducer: rootReducer,
  preloadedState, // Set the initial state to the loaded state
});

store.subscribe(() => {
  saveState({
    boxes: store.getState().boxes, // Save only the boxes state to local storage
  });
});

export default store;
