import { createContext, useReducer } from 'react';

export const IsLoadingContext = createContext();

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRUE':
      return { isLoading: true };
    case 'SET_FALSE':
      return { isLoading: false };
    default:
      return state;
  }
};
export const IsLoadingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, {
    isLoading: false,
  });

  console.log('IsLoadingContext state: ', state);

  return (
    <IsLoadingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </IsLoadingContext.Provider>
  );
};
