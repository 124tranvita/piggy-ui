import { createContext, useReducer } from 'react';
import dateFormat from 'dateformat';

export const FilterContext = createContext();

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INCOME':
      return { ...state, filterIncome: action.payload };
    case 'SET_SPENDING':
      return { ...state, filterSpending: action.payload };
    default:
      return state;
  }
};
export const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, {
    filterIncome: {
      period: 'Last 7 Days',
      from: dateFormat(
        new Date(new Date().setDate(new Date().getDate() - 7)),
        'yyyy-mm-dd'
      ),
      to: dateFormat(new Date(), 'yyyy-mm-dd'),
    },
    filterSpending: {
      period: 'Last 7 Days',
      from: dateFormat(
        new Date(new Date().setDate(new Date().getDate() - 7)),
        'yyyy-mm-dd'
      ),
      to: dateFormat(new Date(), 'yyyy-mm-dd'),
    },
  });

  // console.log('FilterCOntext state: ', state);

  return (
    <FilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};
