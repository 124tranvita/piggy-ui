import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Loader from '../components/Loader';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

import { PageTransition } from '../utils/Transition';
import { getData } from '../utils/fetchData';

export default function Spending() {
  const { user } = useAuthContext();
  const { isLoading, dispatch } = useNotificationContext();

  const [data, setData] = useState({
    catalogues: [],
    spendings: [],
  });

  console.log('DATA: ', data);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'SET_ISLOADING', payload: true });
      /** Chanining the request to both of Catalogues and Spendings
       * Catalogues list is need when add spending
       */
      try {
        const [catalogues, spendings] = await Promise.all([
          getData(`catalogues`, user.token, dispatch),
          getData(`spendings`, user.token, dispatch),
        ]);

        setData({
          catalogues: catalogues.data.data,
          spendings: spendings.data.data,
        });

        dispatch({ type: 'SET_ISLOADING', payload: false });
      } catch (err) {
        /** Add some more information for failed object then dispatch to NotificationContext */
        const data = {
          status: 'failed',
          timestamp: new Date().toISOString(),
          unread: true,
          message: err.message,
        };

        dispatch({ type: 'ADD', payload: data });
        dispatch({ type: 'SET_ISLOADING', payload: false });
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Show loader while data is fetching */
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <PageTransition>
      {/* Banner */}
      <Banner title={'Spendings'} description={'Manage all your spendings.'} />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen pt-20">
        <h1>Spending</h1>
      </div>
    </PageTransition>
  );
}
