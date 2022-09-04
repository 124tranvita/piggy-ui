import LineChart from '../Charts/LineChart';
import tailwindConfig from '../../utils/tailwindConfig';

export default function LineChartCard() {
  const chartData = {
    labels: [
      '01-01-2022',
      '02-01-2022',
      '03-01-2022',
      '04-01-2022',
      '05-01-2022',
      '06-01-2022',
      '07-01-2022',
      '08-01-2022',
      '09-01-2022',
      '10-01-2022',
    ],
    datasets: [
      // Indigo line
      {
        label: 'Incomes',
        data: [
          73, 64, 73, 69, 104, 104, 164, 164, 120, 120, 120, 148, 142, 104, 122,
          110, 104, 152, 166, 233, 268, 252, 284, 284, 333, 323,
        ],
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
        data: [
          184, 86, 42, 378, 42, 243, 38, 120, 0, 0, 42, 0, 84, 0, 276, 0, 124,
          42, 124, 88, 88, 215, 156, 88, 124, 64,
        ],
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