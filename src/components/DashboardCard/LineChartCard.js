import { useMemo, useState } from 'react';
import LineChart from '../Charts/LineChart';
import tailwindConfig from '../../utils/tailwindConfig';
import { RiLineChartLine } from 'react-icons/ri';

import { getDatesInRange, getDataByLabel } from '../../utils/Utils';

/** Create the array of last 15 days and use it as chart's labels */
const today = new Date();
const last15days = new Date(new Date().setDate(new Date().getDate() - 15));
const labels = getDatesInRange(last15days, today);

export default function LineChartCard({ incomes, spendings }) {
  const [incomeData, setIncomeData] = useState([]);
  const [spendingData, setSpendingData] = useState([]);

  /**Map the data to the chart's labels */
  useMemo(() => {
    setIncomeData(getDataByLabel(labels, incomes));
    setSpendingData(getDataByLabel(labels, spendings));
  }, [incomes, spendings]);

  /**Define the chart's data */
  const chartData = {
    labels: labels,
    datasets: [
      // Indigo line
      {
        label: 'Incomes',
        data: incomeData,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
      },
      // Blue line
      {
        label: 'Spendings',
        data: spendingData,
        borderColor: tailwindConfig().theme.colors.blue[400],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[400],
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full bg-white">
      <header className="px-5 py-4 border-b border-slate-200 flex items-center">
        <div className="text-4xl mr-3 text-orange-500">
          <RiLineChartLine />
        </div>
        <h2 className="font-semibold text-slate-800">Income/Spendings</h2>
        <div className="text-xs text-slate-400  px-2">(Last 15 days)</div>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartData} width={595} height={248} />
    </div>
  );
}
