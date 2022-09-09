import { createContext, useReducer } from 'react';

export const NotificationContext = createContext();

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, notif: state.notif.concat(action.payload) };
    case 'REMOVE':
      return { ...state, notif: state.notif.pop(action.payload) };
    case 'READ':
      return {
        ...state,
        notif: state.notif.map((el, index) => {
          if (index === action.payload) el.unread = false;
          return el;
        }),
      };
    case 'READALL':
      return {
        ...state,
        notif: state.notif.map((el) => {
          return { ...el, unread: false };
        }),
      };
    case 'CLEAR':
      return { ...state, notif: [] };
    case 'SET_ISLOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notif: [],
    isLoading: false,
  });

  // console.log('NotificationContext state: ', state);

  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
