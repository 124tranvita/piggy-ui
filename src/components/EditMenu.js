import { useState, useEffect, useRef } from 'react';
import { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';

export default function EditMenu({ children, ...rest }) {
  const [dropdownOpen, setDropDownOpen] = useState(false);

  const trigger = useRef(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || trigger.current.contains(target)) return;
      setDropDownOpen(false);
    };

    document.addEventListener('click', clickHandler);

    return () => document.removeEventListener('click', clickHandler);
  });

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropDownOpen(false);
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <Menu as="div" {...rest}>
      <div>
        <Menu.Button
          ref={trigger}
          className={`text-slate-400 hover:text-slate-500 rounded-full ${
            dropdownOpen && 'bg-slate-100 text-slate-500'
          }`}
          onClick={() => setDropDownOpen(!dropdownOpen)}
        >
          <span className="sr-only">Menu</span>
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 top-8 -right-2 mt-2 w-40 origin-top-right rounded-md divide-y divide-slate-200 dark:divide-slate-600 bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
