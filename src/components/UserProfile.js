import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useClearNotification } from '../hooks/useClearNotification';

import '../css/style.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserProfile() {
  const { logout } = useLogout();
  const { clearNotification } = useClearNotification();
  const { user } = useAuthContext();

  const handleClick = () => {
    clearNotification();
    logout();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center w-8 h-8 mr-3 text-2xl text-white rounded-full md:mr-0 hover:ring-1 hover:ring-gray-200">
          <img
            src="assets/images/user.svg"
            className="w-8 h-8 rounded-full"
            alt="user profile"
          />
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
        {/* origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 enter-done */}
        <div className="usermenu_wrapper">
          <div className="py-3 px-4">
            <span className="block text-sm text-gray-900 dark:text-white">
              {user.data.user.name}
            </span>
            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
              {user.data.user.email}
            </span>
          </div>
          <div className="z-50 py-1">
            <div>
              {({ active }) => (
                <a
                  href="#a"
                  className={classNames(
                    active
                      ? 'z-50 bg-gray-100 text-gray-900'
                      : 'z-50 text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </a>
              )}
            </div>
            <div>
              {({ active }) => (
                <a
                  href="#a"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </div>
            <div>
              {({ active }) => (
                <a
                  href="#a"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </div>
            <div>
              {({ active }) => (
                <button
                  type="submit"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm'
                  )}
                  onClick={handleClick}
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </Menu>
  );
}
