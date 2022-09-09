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

/** Because the different time zone when save the new item to mongoDB
 * Current new Date() in client will be deplay with the Date() on mongoDB for few minutes
 * Temporay fix by query from the last <num> days to the next day instead of to the current day.
 */

export const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, {
    filterIncome: {
      period: 'Last Month',
      from: new Date(
        new Date().setDate(new Date().getDate() - 30)
      ).toISOString(),
      to: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    },
    filterSpending: {
      period: 'Last Month',
      from: new Date(
        new Date().setDate(new Date().getDate() - 30)
      ).toISOString(),
      to: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    },
  });

  // console.log('FilterCOntext state: ', state);

  return (
    <FilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};
