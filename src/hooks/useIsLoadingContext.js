import { useContext } from 'react';
import { IsLoadingContext } from '../context/IsLoadingContext';

export const useIsLoadingContext = () => {
  const context = useContext(IsLoadingContext);

  if (!context) {
    throw Error('useIsLoadingContext must be used inside a IsLoadingContext');
  }

  return context;
};
