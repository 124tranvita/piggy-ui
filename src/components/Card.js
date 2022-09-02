import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import EditMenu from './EditMenu';

export default function Card({ title, amount, icon }) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5 pb-2">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={icon} width="32" height="32" alt="icon" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <Menu.Item>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </Menu.Item>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">{title}</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          Amount
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">
            ${amount}
          </div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            +49%
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          in this month
        </div>
      </div>
    </div>
  );
}
