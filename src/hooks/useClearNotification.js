import { useNotificationContext } from './useNotificationContext';

export const useClearNotification = () => {
  const { dispatch } = useNotificationContext();

  const clearNotification = () => {
    // dispatch clear action
    dispatch({ type: 'CLEAR' });
  };

  return { clearNotification };
};
