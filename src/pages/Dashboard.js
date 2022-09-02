import Card from '../components/Card';
import TableCard from '../components/TableCard';
import images from '../assets/images';
import INCOMES from '../assets/dev-data/incomes.json';

export default function Dashboard() {
  console.log(INCOMES);

  return (
    <div>
      <div className="p-7 text-2xl font-semibold h-screen pt-20 bg-slate-100">
        <h1 className="pb-4">Dashboard</h1>
        <div className="grid grid-cols-12 gap-6">
          <Card title={'BALANCE'} amount={'10,000'} icon={images.logo} />
          <Card title={'INCOMES'} amount={'40,000'} icon={images.income} />
          <Card title={'SPENDINGS'} amount={'30,000'} icon={images.spending} />
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
        </div>
      </div>
    </div>
  );
}
