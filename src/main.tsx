import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavProvider } from './components/Contexts/NavContext.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { loadState, saveState } from './utils/localStorage'; // Import utility functions
import { ControlPanelProvider } from './components/Contexts/ControlPanelContext.tsx';
import { WindowSizeProvider } from './components/Contexts/WindowSizeContext.tsx';
import { DeviceProvider } from './hooks/deviceDetector.tsx';

// Load the state from localStorage
const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState, // Use the preloaded state from localStorage
});

// Save the state to localStorage whenever it changes
store.subscribe(() => {
  saveState({
    boxes: store.getState().boxes, // Save only the 'boxes' state
  });
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ControlPanelProvider>
        <WindowSizeProvider>
          <DeviceProvider>
            <NavProvider>
              <App />
            </NavProvider>
          </DeviceProvider>
        </WindowSizeProvider>
      </ControlPanelProvider>
    </Provider>
  </React.StrictMode>,
);
