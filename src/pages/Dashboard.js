import TableCard from '../components/DashboardCard/TableCard';
import SummaryCard from '../components/DashboardCard/SummaryCard';
import LineChartCard from '../components/DashboardCard/LineChartCard';
import DoughnutChartCard from '../components/DashboardCard/DoughnutChartCard';
import Banner from '../components/Banner';
import images from '../assets/images';
import INCOMES from '../assets/dev-data/incomes.json';

import { useAuthContext } from '../hooks/useAuthContext';

export default function Dashboard() {
  const { user } = useAuthContext();

  const { balance, income, spending } = user.data.user;

  return (
    <div>
      <div className="font-semibold">
        <Banner
          title={'Dashboard'}
          description={`Wellcome back, ${user.data.user.name}!`}
        />
        <div className="grid grid-cols-12 gap-6">
          <SummaryCard title={'BALANCE'} amount={balance} icon={images.logo} />
          <SummaryCard title={'INCOMES'} amount={income} icon={images.income} />
          <SummaryCard
            title={'SPENDINGS'}
            amount={spending}
            icon={images.spending}
          />
          <LineChartCard />
          <TableCard
            title={'Incomes'}
            data={INCOMES.data.data}
            icon={images.income}
            textColor={'text-green-500'}
          />
          <TableCard
            title={'Spendings'}
            data={INCOMES.data.data}
            icon={images.spending}
            textColor={'text-rose-500'}
          />
          <DoughnutChartCard />
        </div>
      </div>
    </div>
  );
}
