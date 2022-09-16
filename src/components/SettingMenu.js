import { useState } from 'react';

import { Menu } from '@headlessui/react';
import { BsGear } from 'react-icons/bs';

import { NavMenuTransition } from '../utils/Transition';
import Toggle from '../utils/Toggle';

export default function SettingMenu() {
  /**Get previous settings from local storage */
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? true : false
  );
  const [isDollar, setIsDollar] = useState(
    localStorage.getItem('currency') === 'usd' ? true : false
  );
  const [enabled, setEnabled] = useState(false);

  const handleSubmit = () => {
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
    localStorage.setItem('currency', isDollar ? 'usd' : 'vnd');

    window.location.reload();
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center bg-blue-500 dark:bg-slate-800 w-8 h-8 text-2xl text-white rounded-full md:mr-0 hover:ring-1 hover:ring-gray-200">
            <BsGear className="ml-1" />
          </Menu.Button>
        </div>

        <NavMenuTransition>
          <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right rounded-md text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex justify-between items-center mx-4">
              <p className="text-sm font-semibold">Dark theme</p>
              <Toggle enabled={darkTheme} setEnabled={setDarkTheme} />
            </div>
            <div className="flex justify-between items-center mx-4">
              <p className="text-sm font-semibold">English</p>
              <Toggle enabled={enabled} setEnabled={setEnabled} />
            </div>
            <div className="flex justify-between items-center mx-4">
              <p className="text-sm font-semibold">Currency ($)</p>
              <Toggle enabled={isDollar} setEnabled={setIsDollar} />
            </div>
            <div className="flex flex-col items-center p-4">
              <button
                className=" border-1 border-slate-500 text-slate-800 dark:text-slate-200 hover:border-slate-300 hover:text-slate-300 px-2 rounded-md"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </Menu.Items>
        </NavMenuTransition>
      </Menu>
    </>
  );
}
