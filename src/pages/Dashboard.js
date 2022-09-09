import { useEffect, useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';

import TableCard from '../components/DashboardCard/TableCard';
import SummaryCard from '../components/DashboardCard/SummaryCard';
import LineChartCard from '../components/DashboardCard/LineChartCard';
import DoughnutChartCard from '../components/DashboardCard/DoughnutChartCard';
import Banner from '../components/Banner';
import images from '../assets/images';

import Loader from '../components/Loader';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

import { getData } from '../utils/fetchData';
import { PageTransition } from '../utils/Transition';

export default function Dashboard() {
  const { user } = useAuthContext();
  const { isLoading, dispatch } = useNotificationContext();

  const [data, setData] = useState({});

  useEffect(() => {
    dispatch({ type: 'SET_ISLOADING', payload: true });
    getData('users/user-stats', user.token)
      .then((result) => {
        setData(result.data.data);
        dispatch({ type: 'SET_ISLOADING', payload: false });
      })
      .catch((err) => {
        const data = {
          status: 'failed',
          timestamp: new Date().toISOString(),
          unread: true,
          message: err.message,
        };

        dispatch({ type: 'ADD', payload: data });
        dispatch({ type: 'SET_ISLOADING', payload: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Banner
        title={'Dashboard'}
        description={`Wellcome back, ${user.data.user.name}!`}
        icon={<AiOutlineDashboard />}
      />

      <PageTransition>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-12 gap-6">
            <SummaryCard
              title={'BALANCE'}
              amount={data.balance}
              icon={images.logo}
            />
            <SummaryCard
              title={'INCOMES'}
              amount={data.income}
              icon={images.income}
            />
            <SummaryCard
              title={'SPENDINGS'}
              amount={data.spending}
              icon={images.spending}
            />
            <LineChartCard user={user} />
            <TableCard
              title={'Incomes'}
              data={data.incomes}
              icon={images.income}
              textColor={'text-green-500'}
            />
            <TableCard
              title={'Spendings'}
              data={data.spendings}
              icon={images.spending}
              textColor={'text-rose-500'}
            />

            <DoughnutChartCard />
          </div>
        )}
      </PageTransition>
    </>
  );
}
