import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AiOutlineBell } from 'react-icons/ai';

import { useNotificationContext } from '../hooks/useNotificationContext';

export default function Notification() {
  const { notif, dispatch } = useNotificationContext();

  const unreadNotif = notif.filter((el) => el.unread === true);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center bg-blue-500 w-8 h-8 text-2xl text-white rounded-full md:mr-0 hover:ring-1 hover:ring-gray-200">
          <AiOutlineBell className="ml-1" />
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
        <Menu.Items className="absolute right-0 mt-2 h-screen60 w-64 md:w-80 xl:w-96 origin-top-right rounded-md divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto">
          <button
            className="text-sm text-gray-600 mx-2 font-semibold"
            onClick={() => dispatch({ type: 'CLEAR' })}
          >
            Clear all
          </button>
          <span className="text-sm text-gray-600 font-semibold">|</span>
          <button
            className="text-sm text-gray-600 mx-2 font-semibold"
            onClick={() => dispatch({ type: 'READALL' })}
          >
            Read all
          </button>

          {notif
            .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
            .map((el, index) => (
              <div
                className={`py-1 ${el.unread ? 'cursor-pointer' : ''}`}
                key={index}
              >
                <div>
                  {el.status === 'failed' ? (
                    <div
                      className="block px-4 py-2"
                      onClick={() => dispatch({ type: 'READ', payload: index })}
                    >
                      <div className="text-sm text-gray-500">
                        {el.timestamp}
                      </div>
                      <div
                        className={`${
                          el.unread ? 'font-bold' : ''
                        } text-sm text-rose-500`}
                      >
                        {el.message}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="block px-4 py-2"
                      onClick={() => dispatch({ type: 'READ', payload: index })}
                    >
                      <div className="text-sm text-gray-500">
                        {el.timestamp}
                      </div>
                      <div
                        className={`${
                          el.unread ? 'font-bold' : ''
                        } text-sm text-green-500`}
                      >
                        Task successful!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </Menu.Items>
      </Transition>
      <div className="absolute -top-2 -right-1 text-xs px-1 bg-red-500 text-white rounded-full">
        {unreadNotif.length}
      </div>
    </Menu>
  );
}
