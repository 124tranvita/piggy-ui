import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

export const useFilterContext = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw Error('useFilterContext must be used inside a FilterContext');
  }

  return context;
};
