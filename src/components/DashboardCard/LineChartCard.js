import { useState, useEffect } from 'react';
import LineChart from '../Charts/LineChart';
import tailwindConfig from '../../utils/tailwindConfig';

import { getData } from '../../utils/fetchData';

import { getDatesInRange, getDataByLabel } from '../../utils/Utils';

export default function LineChartCard({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [spendingData, setSpendingData] = useState([]);

  // console.log(data);

  /** Create the array of last 15 days and use it as chart labels */
  const today = new Date();
  const last15days = new Date(new Date().setDate(new Date().getDate() - 15));
  const labels = getDatesInRange(last15days, today);

  useEffect(() => {
    setIsLoading(true);
    getData(
      `incomes/incomes-by-month/${today.getMonth() + 1}`,
      user.token
    ).then((result) => {
      setIncomeData(result.data.data);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getData(
      `spendings/spendings-by-month/${today.getMonth() + 1}`,
      user.token
    ).then((result) => {
      setSpendingData(result.data.data);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enhancedIncomeData = getDataByLabel(labels, incomeData);
  const enhancedSpendingData = getDataByLabel(labels, spendingData);

  const chartData = {
    labels: labels,
    datasets: [
      // Indigo line
      {
        label: 'Incomes',
        data: enhancedIncomeData,
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
        data: enhancedSpendingData,
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

  if (isLoading) {
    return (
      <div className="flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex items-center">
          <h2 className="font-semibold text-slate-800">Income/Spendings</h2>
          <div className="text-xs font-semibold text-slate-400  px-2">
            (per month)
          </div>
        </header>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Income/Spendings</h2>
        <div className="text-xs font-semibold text-slate-400  px-2">
          (per month)
        </div>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartData} width={595} height={248} />
    </div>
  );
}
