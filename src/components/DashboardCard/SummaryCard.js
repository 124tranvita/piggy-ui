import { Link } from 'react-router-dom';
import numberFormat from '../../utils/numberFormat';
import { TbActivityHeartbeat } from 'react-icons/tb';

export default function SummaryCard({ title, amount, icon }) {
  const balanceBadge = `text-sm font-semibold text-white ${
    amount > 0 ? 'bg-green-500' : 'bg-rose-500'
  } rounded-full px-2`;
  const balanceBadgeIcon = amount > 0 ? '\u2713' : 'x';

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5 pb-2">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={icon} width="32" height="32" alt="icon" />
          {/* Menu button */}
          <div className="text-md font-semibold text-slate-400 uppercase mb-1">
            <Link to="#0">
              <button>
                <TbActivityHeartbeat />
              </button>
            </Link>
          </div>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">{title}</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          Amount
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">
            {amount
              ? numberFormat({ locale: 'vi-VN', currency: 'VND' }).format(
                  amount
                )
              : numberFormat({ locale: 'vi-VN', currency: 'VND' }).format(0)}
          </div>
          {title.toLowerCase() === 'balance' && (
            <div className={balanceBadge}>{balanceBadgeIcon}</div>
          )}
        </div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          in this month
        </div>
      </div>
    </div>
  );
}
