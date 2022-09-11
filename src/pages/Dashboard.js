import { useEffect, useState } from 'react';
import {
  MdBarChart,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
} from 'react-icons/md';

import TableCard from '../components/DashboardCard/TableCard';
import SummaryCard from '../components/DashboardCard/SummaryCard';
import LineChartCard from '../components/DashboardCard/LineChartCard';
import DoughnutChartCard from '../components/DashboardCard/DoughnutChartCard';

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
      .catch((error) => {
        const data = {
          status: 'failed',
          timestamp: new Date().toISOString(),
          unread: true,
          message: `Server unavailable. ${error.message} data.`,
        };

        dispatch({ type: 'ADD', payload: data });
        dispatch({ type: 'SET_ISLOADING', payload: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageTransition>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-12 gap-6">
            <SummaryCard
              title={'Balance'}
              amount={data.balance}
              icon={<MdBarChart />}
              iconColor={'text-blue-500'}
            />
            <SummaryCard
              title={'Incomes'}
              amount={data.income}
              icon={<MdOutlineTrendingUp />}
              iconColor={'text-emerald-500'}
            />
            <SummaryCard
              title={'Spendings'}
              amount={data.spending}
              icon={<MdOutlineTrendingDown />}
              iconColor={'text-rose-500'}
            />
            <LineChartCard user={user} />
            <TableCard
              title={'Incomes'}
              data={data.incomes}
              textColor={'text-emerald-500'}
            />
            <TableCard
              title={'Spendings'}
              data={data.spendings}
              textColor={'text-rose-500'}
            />

            <DoughnutChartCard />
          </div>
        )}
      </PageTransition>
    </>
  );
}
