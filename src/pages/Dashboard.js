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
import { Loader, NoDataPlaceHolder } from '../components/Loader';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

import { getData } from '../utils/fetchData';
import { PageTransition } from '../utils/Transition';

export default function Dashboard() {
  /**Get contexts states */
  const { user } = useAuthContext();
  const { isLoading, dispatch } = useNotificationContext();

  /**State to set data from API response */
  const [data, setData] = useState(null);

  useEffect(() => {
    getData('users/user-stats', user.token, dispatch).then((result) => {
      setData(result.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <PageTransition>
        {!data ? (
          <NoDataPlaceHolder />
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {/* Summary Cards */}
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

            {/* Line Chart */}
            <LineChartCard incomes={data.incomes} spendings={data.spendings} />

            {/* Table cards */}
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

            {/* Doughnut Chart */}
            <DoughnutChartCard />
          </div>
        )}
      </PageTransition>
    </>
  );
}
