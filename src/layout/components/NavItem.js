import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MdNotificationsNone } from 'react-icons/md';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserProfile({ isUser, data }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center w-8 h-8 mr-3 text-2xl text-white rounded-full md:mr-0 hover:ring-1 hover:ring-gray-200">
          {isUser ? (
            <img
              src="assets/images/user.svg"
              className="w-8 h-8 rounded-full"
              alt="user profile"
            />
          ) : (
            <MdNotificationsNone className="w-6 h-6 rounded-full mx-auto bg-emerald-500" />
          )}
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
        <Menu.Items className=" z-50 absolute right-0 mt-2 w-56 origin-top-right rounded-md divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className=" z-50 py-3 px-4">
            <span className="z-50 block text-sm text-gray-900 dark:text-white">
              {user.data.user.name}
            </span>
            <span className="z-50 block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
              {user.data.user.email}
            </span>
          </div>
          <div className="z-50 py-1">
            <Menu.Item>
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
            </Menu.Item>
            <Menu.Item>
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
            </Menu.Item>
            <Menu.Item>
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
            </Menu.Item>
            <Menu.Item>
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
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
