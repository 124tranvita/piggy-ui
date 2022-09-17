import { Link } from 'react-router-dom';
import numberFormat from '../../utils/numberFormat';
import { TbActivityHeartbeat } from 'react-icons/tb';

export default function SummaryCard({ title, amount, icon, iconColor }) {
  const balanceBadge = `text-sm font-semibold text-white ${
    amount > 0 ? 'bg-green-500' : 'bg-rose-500'
  } rounded-full px-2`;
  const balanceBadgeIcon = amount > 0 ? '\u2713' : 'x';

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-slate-50 dark:bg-slate-800 ">
      <div className="px-5 pt-5 pb-2">
        <div className="flex justify-between items-start mb-2 border-b-1 dark:border-slate-600">
          {/* Icon */}
          <span className={`text-5xl ${iconColor}`}>{icon}</span>
          {/* Infor menu*/}
          <div className="text-right mb-3 text-slate-400 dark:text-slate-200">
            <div className="mb-3">
              <h2 className=" font-semibold text-slate-800 dark:text-slate-200">
                {title}
              </h2>
              <p className="text-sm text-slate-400 dark:text-slate-300">
                (Latest 30 days)
              </p>
            </div>

            <div className="flex items-start">
              <div className="text-3xl font-bold mr-2 text-slate-800 dark:text-slate-200">
                {amount
                  ? numberFormat().format(amount)
                  : numberFormat().format(0)}
              </div>
              {title.toLowerCase() === 'balance' && (
                <div className={balanceBadge}>{balanceBadgeIcon}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center text-slate-500">
          <TbActivityHeartbeat />
          <Link to="#0">
            <p className="text-sm mx-3 text-blue-500 hover:text-blue-600">
              Manage
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
