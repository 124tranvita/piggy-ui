import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiFilter, FiCheck } from 'react-icons/fi';

import { useFilterContext } from '../hooks/useFilterContext';

const date = new Date();

const last7days = new Date(new Date().setDate(date.getDate() - 7));
const lastMonth = new Date(new Date().setDate(date.getDate() - 30));
const lastSixMonth = new Date(new Date().setDate(date.getDate() - 180));
const lastYear = new Date(new Date().setDate(date.getDate() - 360));

const options = [
  {
    period: 'Last 7 Days',
    from: last7days.toISOString(),
    to: date.toISOString(),
  },
  {
    period: 'Last Month',
    from: lastMonth.toISOString(),
    to: date.toISOString(),
  },
  {
    period: 'Last 6 Months',
    from: lastSixMonth.toISOString(),
    to: date.toISOString(),
  },
  {
    period: 'In Year',
    from: lastYear.toISOString(),
    to: date.toISOString(),
  },
];

export default function SelectBox({ fn, ...props }) {
  const { filterIncome, dispatch } = useFilterContext();
  const [selected, setSelected] = useState(
    options.find((el) => el.period === filterIncome.period)
  );

  console.log('Selected: ', selected);

  const hanldeClick = (el) => {
    dispatch({ type: 'SET_INCOME', payload: el });
  };

  return (
    <div {...props}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg py-2 px-4 text-white text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              <FiFilter />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-52 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((el, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-green-100' : 'text-gray-900'
                    }`
                  }
                  value={el}
                  onClick={() => hanldeClick(el)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-semibold' : 'font-normal'
                        }`}
                      >
                        {el.period}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
