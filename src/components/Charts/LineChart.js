import { useRef, useEffect } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';

import tailwindConfig from '../../utils/tailwindConfig';
import numberFormat from '../../utils/numberFormat';

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
);

export default function LineChart({ data, width, height }) {
  const canvas = useRef(null);
  const legend = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;

    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      labels: ['a', 'b'],
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              beginAtZero: true,
            },
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => numberFormat().format(value),
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'DD-MM-YYYY',
              unit: 'day',
            },
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => numberFormat().format(context.parsed.y),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: 'htmlLegend',
          afterUpdate(c, args, options) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.slice(0, 3).forEach((item) => {
              const li = document.createElement('li');
              li.style.marginLeft = tailwindConfig().theme.margin[3];
              // Button element
              const button = document.createElement('button');
              button.style.display = 'inline-flex';
              button.style.alignItems = 'center';
              button.style.opacity = item.hidden ? '.3' : '';
              button.onclick = () => {
                c.setDatasetVisibility(
                  item.datasetIndex,
                  !c.isDatasetVisible(item.datasetIndex)
                );
                c.update();
              };
              // Color box
              const box = document.createElement('span');
              box.style.display = 'block';
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.borderWidth = '3px';
              box.style.borderColor =
                c.data.datasets[item.datasetIndex].borderColor;
              box.style.pointerEvents = 'none';
              // Label
              const label = document.createElement('span');
              label.style.color = tailwindConfig().theme.colors.slate[500];
              label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
              label.style.lineHeight =
                tailwindConfig().theme.fontSize.sm[1].lineHeight;
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          },
        },
      ],
    });

    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="px-5 py-3">
        <div className="flex flex-wrap justify-between items-end">
          <div className="grow ml-2 mb-1">
            <ul ref={legend} className="flex flex-wrap justify-end"></ul>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </>
  );
}
