import { useRef, useEffect } from 'react';
import {
  Chart,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';
// import tailwindConfig from '../../utils/tailwindConfig';

Chart.register(
  DoughnutController,
  ArcElement,
  TimeScale,
  TimeScale,
  Tooltip,
  Legend
);

export default function DoughnutChart({ data, width, height }) {
  const canvas = useRef(null);
  const legend = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        cutout: '50%',
        layout: {
          padding: 24,
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <div className="px-5 pt-2 pb-6">
        <ul ref={legend} className="flex flex-wrap justify-center -m-1"></ul>
      </div>
    </div>
  );
}
