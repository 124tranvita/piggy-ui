import { createContext, useReducer } from 'react';

export const NotificationContext = createContext();

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { notif: state.notif.concat(action.payload) };
    case 'REMOVE':
      return { notif: state.notif.pop(action.payload) };
    case 'READ':
      return {
        notif: state.notif.map((el, index) => {
          if (index === action.payload) el.unread = false;
          return el;
        }),
      };
    case 'READALL':
      return {
        notif: state.notif.map((el) => {
          return { ...el, unread: false };
        }),
      };
    case 'CLEAR':
      return { notif: [] };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notif: [],
  });

  // console.log('NotificationContext state: ', state);

  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
