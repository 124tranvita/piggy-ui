import { useEffect, useState } from 'react';

import TableCard from '../components/DashboardCard/TableCard';
import SummaryCard from '../components/DashboardCard/SummaryCard';
import LineChartCard from '../components/DashboardCard/LineChartCard';
import DoughnutChartCard from '../components/DashboardCard/DoughnutChartCard';
import Banner from '../components/Banner';
import images from '../assets/images';

import Loader from '../components/Loader';

import { useAuthContext } from '../hooks/useAuthContext';
import { useIsLoadingContext } from '../hooks/useIsLoadingContext';

import { getData } from '../utils/fetchData';

export default function Dashboard() {
  const { user } = useAuthContext();
  const { isLoading, dispatch } = useIsLoadingContext();

  const [data, setData] = useState({});

  console.log(data);

  // const { balance, income, spending } = user.data.user;

  useEffect(() => {
    dispatch({ type: 'SET_TRUE' });
    getData('users/user-stats', user.token).then((result) => {
      setData(result.data.data);
      dispatch({ type: 'SET_FALSE' });
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
    <div>
      <div className="font-semibold">
        <Banner
          title={'Dashboard'}
          description={`Wellcome back, ${user.data.user.name}!`}
        />
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
          <LineChartCard data={data} />
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
      </div>
    </div>
  );
}
