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
          <img src="assets/images/logo.svg" width="32" height="32" alt="" />
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
        <Menu.Items className="absolute top-8 right-0 mt-2 w-56 origin-top-right rounded-md divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
