import { createContext } from 'react';

export const initialState = {
  safeAreaInsets: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

export default createContext(initialState);
