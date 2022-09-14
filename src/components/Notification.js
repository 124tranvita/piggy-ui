import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AiOutlineBell } from 'react-icons/ai';

import { useNotificationContext } from '../hooks/useNotificationContext';

/**Define status code message */
const contentByStatusCode = {
  200: 'Item was updated successfully.',
  201: 'Item was created successfully.',
  204: 'Item was deleted successfully.',
  400: 'Item was unabled to be created/updated or deleted.',
  500: 'Server unreachable. Failed to load data.',
};

export default function Notification() {
  /**Get notification context state and dispatch */
  const { notif, isToastOpen, dispatch } = useNotificationContext();

  /**Filter the unread notifications */
  const unreadNotif = notif.filter((el) => el.unread === true);

  return (
    <>
      <ToastNotification
        isToastOpen={isToastOpen}
        dispatch={dispatch}
        status={notif[0] ? notif[0].status : ''}
      />
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
          <Menu.Items className="absolute right-0 mt-2 w-64 md:w-80 xl:w-96 origin-top-right rounded-md divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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

            <div className="h-screen60 overflow-y-auto">
              {notif
                .sort(
                  (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
                )
                .map((el, index) => (
                  <div
                    className={`py-1 ${el.unread ? 'cursor-pointer' : ''}`}
                    key={index}
                  >
                    <div>
                      {el.status === 400 || el.status === 500 ? (
                        <div
                          className="block px-4 py-2"
                          onClick={() =>
                            dispatch({ type: 'READ', payload: index })
                          }
                        >
                          <div className="text-sm text-gray-500">
                            {el.timestamp}
                          </div>
                          <div
                            className={`${
                              el.unread ? 'font-bold' : ''
                            } text-sm text-rose-500`}
                          >
                            {contentByStatusCode[el.status]}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="block px-4 py-2"
                          onClick={() =>
                            dispatch({ type: 'READ', payload: index })
                          }
                        >
                          <div className="text-sm text-gray-500">
                            {el.timestamp}
                          </div>
                          <div
                            className={`${
                              el.unread ? 'font-bold' : ''
                            } text-sm text-green-500`}
                          >
                            {contentByStatusCode[el.status]}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </Menu.Items>
        </Transition>
        <div className="absolute -top-2 -right-1 text-xs px-1 bg-red-500 text-white rounded-full">
          {unreadNotif.length}
        </div>
      </Menu>
    </>
  );
}

const ToastNotification = ({ isToastOpen, dispatch, status }) => {
  return (
    <>
      {isToastOpen && (
        <div
          id="toast-default"
          className=" absolute left-0 right-0 mx-auto top-10 flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow-lg"
          role="alert"
        >
          {status === 400 || status === 500 ? (
            <>
              <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Error icon</span>
              </div>
              <div className="ml-3 text-sm font-bold">Operation failed.</div>
            </>
          ) : (
            <>
              <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Fire icon</span>
              </div>
              <div className="ml-3 text-sm font-bold">Operation succeeded.</div>
            </>
          )}
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
            onClick={() =>
              dispatch({ type: 'SET_ISTOASTOPEN', payload: false })
            }
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};
