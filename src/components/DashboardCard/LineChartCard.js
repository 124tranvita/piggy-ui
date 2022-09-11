import { useState, useEffect } from 'react';
import LineChart from '../Charts/LineChart';
import tailwindConfig from '../../utils/tailwindConfig';
import { RiLineChartLine } from 'react-icons/ri';

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
    const fetchData = async () => {
      setIsLoading(true);
      /** Chanining the request to both of Catalogues and Spendings
       * Catalogues list is need when add spending
       */
      try {
        const [incomes, spendings] = await Promise.all([
          getData(
            `incomes/incomes-by-month/${today.getMonth() + 1}`,
            user.token
          ),
          getData(
            `spendings/spendings-by-month/${today.getMonth() + 1}`,
            user.token
          ),
        ]);

        setIncomeData(incomes.data.data);
        setSpendingData(spendings.data.data);

        setIsLoading(false);
      } catch (err) {
        /** Add some more information for failed object then dispatch to NotificationContext */
      }
    };

    fetchData();
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
      <div style={{ height: '300px' }}>
        {isLoading ? (
          <span className="sr-only">Loading....</span>
        ) : (
          <div className=" transition duration-300">
            <LineChart data={chartData} width={595} height={248} />
          </div>
        )}
      </div>
    </div>
  );
}
