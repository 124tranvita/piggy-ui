import { createContext, useReducer } from 'react';

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
      period: 'Last Month',
      from: new Date(
        new Date().setDate(new Date().getDate() - 30)
      ).toISOString(),
      to: new Date().toISOString(),
    },
    filterSpending: {
      period: 'Last Month',
      from: new Date(
        new Date().setDate(new Date().getDate() - 30)
      ).toISOString(),
      to: new Date().toISOString(),
    },
  });

  // console.log('FilterCOntext state: ', state);

  return (
    <FilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};
