// src/reducers/index.ts
import { combineReducers } from 'redux';
import boxReducer from '../features/boxSlice';

// Example reducer (replace with your actual reducers)
const exampleReducer = (state = {}, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: exampleReducer,
  // Add other reducers here
  boxes: boxReducer,
});

export default rootReducer;
